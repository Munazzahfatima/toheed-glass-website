import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">

      {/* Main content */}
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="group flex items-center gap-3">
            <Image src="/images/logo.png" alt="New Toheed Glass" width={48} height={48}
                   className="h-12 w-12 rounded-xl bg-white object-contain p-1.5 transition-transform group-hover:scale-105" />
            <div className="leading-snug">
              <p className="font-serif text-[17px] font-bold text-white">New Toheed Glass</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                &amp; Accessories
              </p>
            </div>
          </Link>

          <p className="mt-5 text-sm leading-relaxed text-white/45">
            Pakistan's trusted manufacturer and supplier of decorative and architectural glass solutions.
          </p>

          <div className="mt-6 space-y-3">
            <a href="tel:+923015025862"
               className="flex items-center gap-2.5 text-sm text-white/50 transition hover:text-gold">
              <Phone className="h-4 w-4 shrink-0 text-gold" /> +92 301 502 5862
            </a>
            <a href="mailto:mudassirchadhar789@gmail.com"
               className="flex items-center gap-2.5 break-all text-sm text-white/50 transition hover:text-gold">
              <Mail className="h-4 w-4 shrink-0 text-gold" /> mudassirchadhar789@gmail.com
            </a>
            <span className="flex items-start gap-2.5 text-sm text-white/50">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              109-A Satellite Town, Sargodha, Pakistan
            </span>
            <span className="flex items-center gap-2.5 text-sm text-white/50">
              <Clock className="h-4 w-4 shrink-0 text-gold" />
              Mon – Sat: 10:00 AM – 8:00 PM
            </span>
          </div>
        </div>

        {/* Decorative Glass */}
        <div>
          <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Decorative Glass
          </h4>
          <ul className="space-y-2.5">
            {[
              "Ceiling Glass",
              "LED Smart Mirror",
              "Beveled Mirror Wall",
              "Frosted Glass",
              "Privacy Frosted Glass",
              "Original Stained Glass",
              "Artistic Stained Glass",
              "Crystal Glass Panels",
            ].map((item) => (
              <li key={item}>
                <Link href="/products?category=DECORATIVE_GLASS"
                      className="group flex items-center gap-1.5 text-sm text-white/45 transition hover:text-gold">
                  <ArrowRight className="h-3 w-3 shrink-0 text-gold/40 transition group-hover:translate-x-1 group-hover:text-gold" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Architectural Glass */}
        <div>
          <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Architectural Glass
          </h4>
          <ul className="space-y-2.5">
            {[
              "ACP Wall Cladding",
              "Double Glazed Glass",
              "Glass Curtain Wall",
              "Glass Shop Front",
              "Office Glass Partition",
              "Shower Cabin",
              "Stairs Glass Railing",
              "Terrace Glass Railing",
              "Tempered Glass",
            ].map((item) => (
              <li key={item}>
                <Link href="/products?category=ARCHITECTURAL_GLASS"
                      className="group flex items-center gap-1.5 text-sm text-white/45 transition hover:text-gold">
                  <ArrowRight className="h-3 w-3 shrink-0 text-gold/40 transition group-hover:translate-x-1 group-hover:text-gold" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links + CTA card */}
        <div>
          <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {[
              { l: "Home",               h: "/"       },
              { l: "All Products",       h: "/products"  },
              { l: "Project References", h: "/gallery"   },
              { l: "About Us",           h: "/about"     },
              { l: "Contact Us",         h: "/contact"   },
            ].map((i) => (
              <li key={i.l}>
                <Link href={i.h}
                      className="group flex items-center gap-1.5 text-sm text-white/45 transition hover:text-gold">
                  <ArrowRight className="h-3 w-3 shrink-0 text-gold/40 transition group-hover:translate-x-1 group-hover:text-gold" />
                  {i.l}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA card */}
          <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/[0.08] p-5">
            <p className="font-serif text-base font-semibold text-white">Free Consultation</p>
            <p className="mt-1 text-xs leading-relaxed text-white/45">
              Contact our team for a personalised quote on any glass project.
            </p>
            <Link href="/contact"
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gold py-2.5 text-sm font-semibold text-white shadow-gold transition hover:bg-gold-dark">
              Get Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} New Toheed Glass &amp; Accessories. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            {[["Products","/products"],["Projects","/gallery"],["About","/about"],["Contact","/contact"]].map(([l,h]) => (
              <Link key={h} href={h} className="transition hover:text-gold">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
