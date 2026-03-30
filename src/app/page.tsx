import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="min-h-screen px-6 pt-32 pb-20 flex items-center">
        <div className="max-w-[1400px] mx-auto w-full grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.85fr)] items-center">
          <div>
            <div className="flex items-center justify-between gap-6 pb-6 mb-8 border-b border-white/10 text-[0.72rem] font-medium text-white/45">
              <span>Open-Source Website Starter</span>
              <span>Ready To Customize</span>
            </div>

            <p className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.78rem] font-medium text-white/60 mb-6">
              Your Digital Home starts here
            </p>
            <h1 className="text-5xl md:text-7xl xl:text-[7.1rem] font-semibold tracking-[-0.075em] text-white leading-[0.94] mb-6">
              Your website
              <br />
              foundation,
              <br />
              ready to build on.
            </h1>
            <p className="text-lg md:text-2xl text-neutral-300 max-w-3xl leading-relaxed">
              A polished, open-source starter for founders, consultants, and agencies who want an owned
              website, blog, and AI-ready content system. Start with this base, then tailor the design,
              copy, and brand direction to fit your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full text-base font-medium bg-white text-black px-8 py-3.5 hover:bg-transparent hover:text-white border border-white transition-all"
              >
                Explore the starter
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full text-base font-medium bg-transparent text-white px-8 py-3.5 hover:bg-white hover:text-black border border-white/20 transition-all"
              >
                See how to shape it
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Hero", note: "Replace with your headline, value prop, and CTA." },
                { label: "Brand", note: "Apply your colors, typography, and visual direction." },
                { label: "Pages", note: "About, services, contact, and blog are already structured." },
                { label: "System", note: "Connect content, publishing, and analytics on your own stack." },
              ].map((item) => (
                <div
                  key={item.label}
                  className="min-h-[220px] rounded-[1.6rem] border border-white/8 px-6 py-5 flex flex-col justify-between"
                  style={{
                    background:
                      item.label === 'Hero'
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))'
                        : item.label === 'Brand'
                          ? 'linear-gradient(180deg, rgba(245,245,245,0.05), rgba(255,255,255,0.015))'
                          : item.label === 'Pages'
                            ? 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))'
                            : 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  }}
                >
                  <span className="inline-flex w-fit rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.68rem] font-medium tracking-[0.01em] text-white/45">
                    {item.label}
                  </span>
                  <p className="text-[0.98rem] text-neutral-300 leading-relaxed max-w-[20ch]">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/45 mb-4">
                Why This Starter Works
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.05em] text-white">
                Start from structure, not from scratch.
              </h2>
            </div>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {[
              {
                number: "01",
                title: "You own the stack",
                description:
                  "The site, data, and publishing system live on infrastructure you control. That means fewer platform dependencies and more room to adapt.",
              },
              {
                number: "02",
                title: "It is ready for AI workflows",
                description:
                  "The architecture already supports content publishing, shared data, and structured systems that can work with AI instead of fighting it.",
              },
              {
                number: "03",
                title: "It already looks intentional",
                description:
                  "This starter is meant to feel premium on day one, then become fully yours once you apply your copy, brand, and visual direction.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="grid gap-6 md:grid-cols-[100px_minmax(0,280px)_minmax(0,1fr)] px-0 py-10 md:py-12"
              >
                <span className="font-mono text-sm uppercase tracking-[0.18em] text-white/40">
                  {item.number}
                </span>
                <h3 className="text-2xl font-medium tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="text-lg text-neutral-400 max-w-3xl">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white text-black">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-black/45 mb-4">
                How It Comes Together
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.05em]">
                A simple path from starter to brand.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 border-y border-black/10">
            {[
              {
                step: "01",
                title: "Set up the foundation",
                description:
                  "Clone the starter, connect Supabase, and get the working architecture live first.",
              },
              {
                step: "02",
                title: "Shape your brand direction",
                description:
                  "Use Prompt Builder and Claude Code to adapt the visual system, messaging, and page content.",
              },
              {
                step: "03",
                title: "Connect publishing",
                description:
                  "Hook up the backend, content corpus, and automation flow so the site can publish and grow.",
              },
              {
                step: "04",
                title: "Refine as you grow",
                description:
                  "Adjust pages, offers, CTAs, and workflows as your business becomes more specific.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className={`px-6 py-10 ${index < 3 ? "xl:border-r xl:border-black/10" : ""} ${index < 2 ? "md:border-r md:border-black/10 xl:border-r" : ""} ${index < 2 ? "border-b md:border-b-0 xl:border-b-0 border-black/10" : ""}`}
              >
                <span className="block text-4xl font-semibold tracking-[-0.06em] text-black/35 mb-6">
                  {item.step}
                </span>
                <h3 className="text-xl font-medium tracking-[-0.03em] mb-4">{item.title}</h3>
                <p className="text-black/65 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/45 mb-4">
                What&apos;s Included
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.05em] text-white">
                The core pieces are already here.
              </h2>
            </div>
          </div>

          <div className="grid gap-px md:grid-cols-2 xl:grid-cols-3 bg-white/10 border border-white/10">
            {[
              ["Content structure", "A working website and blog connected to a shared content model."],
              ["SEO foundations", "Routes, metadata, and content patterns already set up to be search-friendly."],
              ["Lead capture", "Forms and database flows you can adapt to your own offers and pipeline."],
              ["Responsive layouts", "A clean baseline layout system that is easy to restyle without rebuilding."],
              ["AI-ready publishing", "A starter architecture designed to support AI-assisted content workflows."],
              ["Analytics foundations", "The basic tracking and data hooks are already in place for expansion."],
            ].map(([title, description]) => (
              <div key={title} className="bg-black px-6 py-8">
                <span className="inline-flex text-[0.65rem] font-mono uppercase tracking-[0.18em] text-white/40 border border-white/10 px-2.5 py-1 mb-6">
                  Included
                </span>
                <h3 className="text-xl font-medium tracking-[-0.03em] text-white mb-3">{title}</h3>
                <p className="text-neutral-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 border-y border-white/10 bg-white/[0.03] text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/45 mb-6">
            Why Ownership Matters
          </p>
          <p className="text-3xl md:text-5xl font-medium tracking-[-0.05em] text-white leading-tight">
            Your website is one of your most valuable digital assets. Starting from an owned foundation
            gives you more control over your content, your data, and how your business evolves online.
          </p>
        </div>
      </section>

      <section className="py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/45 mb-6">
            Start With The Template
          </p>
          <h2 className="text-4xl md:text-6xl xl:text-7xl font-semibold uppercase tracking-[-0.06em] text-white leading-[0.95] mb-6">
            Make the starter yours,
            <br />
            then build from there.
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-10">
            Use this as your base layer, then reshape the brand, messaging, offers, and publishing flow
            around your actual business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full text-base font-medium bg-white text-black px-8 py-3.5 hover:bg-transparent hover:text-white border border-white transition-all"
            >
              Customize the pages
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full text-base font-medium bg-transparent text-white px-8 py-3.5 hover:bg-white hover:text-black border border-white/20 transition-all"
            >
              View the blog structure
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
