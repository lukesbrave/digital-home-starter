'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 transition-all duration-300 ${
        scrolled ? 'bg-black/85 backdrop-blur-md border-b border-white/10' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-[0.62rem] font-medium tracking-[0.02em] text-white/65">
            Starter Template
          </span>
          <span className="font-semibold text-lg tracking-tight">
            Digital Home
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.95rem] font-medium transition-colors ${
                (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                  ? 'text-white'
                  : 'text-white/55 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full text-[0.95rem] font-medium bg-white text-black px-6 py-2.5 hover:bg-transparent hover:text-white border border-white transition-all"
          >
            Start Here
          </Link>
        </div>
      </div>
    </nav>
  );
}
