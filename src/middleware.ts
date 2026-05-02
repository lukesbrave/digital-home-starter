/**
 * Edge Middleware
 * Runs on every request at the edge (Cloudflare Workers).
 *
 * NOTE: Next 16 deprecated the `middleware.ts` filename in favor of
 * `proxy.ts`, but the new `proxy` runtime is nodejs-only and OpenNext on
 * Cloudflare Workers requires Edge runtime. We deliberately keep the
 * legacy `middleware.ts` filename + `middleware` export until OpenNext +
 * Next add support for Edge proxies.
 *
 * Responsibilities:
 * 1. Parse UTM parameters + detect referrer source
 * 2. Detect AI traffic (ChatGPT, Perplexity, Claude, Gemini referrer patterns)
 * 3. Look up or create anonymous visitor profile via cookie
 * 4. Assign visitor segment based on behavior
 * 5. Inject x-visitor-* headers so Server Components can personalize
 */

import { NextRequest, NextResponse } from "next/server";
import { resolveSource } from "@/lib/attribution/source";
import {
  VISITOR_COOKIE_NAME,
  VISITOR_COOKIE_MAX_AGE,
  generateVisitorId,
  assignSegment,
  detectDeviceType,
} from "@/lib/personalization/visitor";

export function middleware(request: NextRequest) {
  const { nextUrl, headers } = request;
  const referrer = headers.get("referer");
  const userAgent = headers.get("user-agent");

  // ── 1. Resolve attribution source ──
  // Convert NextURL to standard URL so attribution utils work correctly
  const url = new URL(nextUrl.toString());
  const attribution = resolveSource(url, referrer, userAgent);

  // ── 2. Visitor identity (anonymous cookie) ──
  let visitorId = request.cookies.get(VISITOR_COOKIE_NAME)?.value;
  const isNewVisitor = !visitorId;

  if (!visitorId) {
    visitorId = generateVisitorId();
  }

  // ── 3. Build lightweight visitor profile for segment assignment ──
  // Note: Full profile (visit count, pages viewed, etc.) lives in Supabase.
  // Middleware only has what's in the cookie + current request.
  // We store the segment in a cookie so it persists between requests.
  const segmentCookie = request.cookies.get("bb_segment")?.value;
  const visitCountCookie = parseInt(request.cookies.get("bb_vc")?.value || "0", 10);
  const visitCount = isNewVisitor ? 1 : visitCountCookie + (isPageNavigation(nextUrl) ? 0 : 0);
  // Visit count is only incremented on new sessions (tracked by bb_vc cookie with session expiry)

  const segment = assignSegment({
    visitCount: visitCount || 1,
    latestSource: attribution.source,
    latestMedium: attribution.medium,
    isAITraffic: attribution.isAITraffic,
    pagesViewed: [], // Would need to read from DB for full accuracy
    deviceType: detectDeviceType(userAgent),
  });

  // ── 4. Create response with personalization headers ──
  const response = NextResponse.next();

  // Headers that Server Components can read via headers()
  response.headers.set("x-visitor-id", visitorId);
  response.headers.set("x-visitor-segment", segment);
  response.headers.set("x-visitor-new", isNewVisitor ? "1" : "0");
  response.headers.set("x-attribution-source", attribution.source);
  response.headers.set("x-attribution-medium", attribution.medium);
  response.headers.set("x-ai-traffic", attribution.isAITraffic ? "1" : "0");
  if (attribution.aiSource) {
    response.headers.set("x-ai-source", attribution.aiSource);
  }
  if (attribution.campaign) {
    response.headers.set("x-attribution-campaign", attribution.campaign);
  }

  // ── 5. Set/refresh cookies ──
  // Visitor ID — long-lived
  response.cookies.set(VISITOR_COOKIE_NAME, visitorId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: "/",
  });

  // Segment — refreshed on each request
  response.cookies.set("bb_segment", segment, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: "/",
  });

  // Visit count — session-scoped (30 min expiry)
  // Only increment if this is a new session
  const sessionCookie = request.cookies.get("bb_session")?.value;
  let newVisitCount = visitCount;
  if (!sessionCookie) {
    newVisitCount = visitCount + 1;
    response.cookies.set("bb_session", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 30, // 30 minutes
      path: "/",
    });
  }

  response.cookies.set("bb_vc", String(newVisitCount), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: "/",
  });

  return response;
}

/**
 * Only run middleware on page routes, not on static assets or API routes.
 */
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, sitemap.xml
     * - Static assets (.svg, .png, .jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)",
  ],
};

function isPageNavigation(url: URL): boolean {
  const path = url.pathname;
  return !path.startsWith("/api/") && !path.startsWith("/_next/");
}
