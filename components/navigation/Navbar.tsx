"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utilities/cn";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();

    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-silver/10 bg-void/90 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-3 sm:px-5 lg:px-8"
      >
        {/* LARGE WEBSITE LOGO - LEFT SIDE */}

        <Link
          href="/"
          aria-label="HUMAN ERROR home"
          className="relative z-10 -ml-1 flex shrink-0 items-center"
        >
          <Logo className="gap-3" />
        </Link>

        {/* DESKTOP NAVIGATION */}

        <ul className="hidden items-center gap-2 xl:gap-3 lg:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-12 items-center justify-center rounded-full px-3 py-3 font-mono text-sm font-extrabold tracking-[0.12em] transition-all duration-300 hover:bg-white/10 hover:text-white xl:px-4",
                  isActive(item.href)
                    ? "text-white"
                    : "text-silver/80"
                )}
              >
                {item.label}

                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-volt shadow-[0_0_10px_#2d7bff]"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE BUTTONS */}

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/contact"
            className="hidden min-h-[48px] items-center justify-center rounded-full bg-chrome px-5 font-mono text-xs font-extrabold tracking-[0.15em] text-void transition-all duration-300 hover:bg-volt hover:text-white hover:shadow-[0_0_20px_#2d7bff] sm:inline-flex"
          >
            START A PROJECT
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-silver/30 text-white transition-colors hover:border-volt hover:bg-white/10 hover:text-volt lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE NAVIGATION */}

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 z-40 h-[calc(100dvh-5rem)] overflow-y-auto bg-void/95 px-6 pb-10 pt-6 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1">
              {siteConfig.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-[56px] items-center border-b border-silver/10 font-display text-2xl font-extrabold uppercase tracking-wide transition-colors hover:text-white",
                      isActive(item.href)
                        ? "text-white"
                        : "text-silver/70"
                    )}
                  >
                    <span className="mr-4 font-mono text-xs font-bold text-volt">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 flex min-h-[54px] items-center justify-center rounded-full bg-chrome font-mono text-sm font-extrabold tracking-[0.2em] text-void transition hover:bg-volt hover:text-white"
            >
              START A PROJECT
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}