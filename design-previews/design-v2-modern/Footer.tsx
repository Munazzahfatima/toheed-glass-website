import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main footer */}
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-4">

        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Logo" width={44} height={44} className="h-11 w-11 rounded bg-white object-contain p-1" />
            <div>
              <p className="font-black uppercase tracking-tight text-white text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
                New Toheed Glass
              </p>
              <p className="text-[10px] tracking-widest text-gold uppercase">& Accessories</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/50">
            Pakistan's trusted manufacturer and supplier of decorative and architectural glass solutions.
          </p>
          {/* Social bar placeholder */}
          <div className="mt-5 h-px w-full bg-white/10" />
          <p className="mt-4 text-[10px] uppercase tracking-widest text-white/30">Sargodha, Pakistan</p>
        </div>

        {/* Decorative Glass */}
        <div>
          <h4 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-gold">
            Decorative Glass
          </h4>
          <ul className="space-y-2.5 text-xs text-white/50">
            {[
              "Ceiling Glass",
              "LED Smart Mirrors",
              "Beveled Mirror Walls",
              "Frosted Glass",
              "Stained Glass",
              "Privacy Frosted Glass",
            ].map((item) => (
              <li key={item}>
                <Link href="/products?category=DECORATIVE_GLASS" className="flex items-center gap-2 transition hover:text-gold">
                  <span className="h-px w-3 bg-gold/50" /> {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Architectural Glass */}
        <div>
          <h4 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-gold">
            Architectural Glass
          </h4>
          <ul className="space-y-2.5 text-xs text-white/50">
            {[
              "ACP Wall Cladding",
              "Glass Curtain Wall",
              "Glass Shop Front",
              "Office Partition",
              "Shower Cabin",
              "Glass Railings",
            ].map((item) => (
              <li key={item}>
                <Link href="/products?category=ARCHITECTURAL_GLASS" className="flex items-center gap-2 transition hover:text-gold">
                  <span className="h-px w-3 bg-gold/50" /> {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-gold">
            Contact Us
          </h4>
          <ul className="space-y-4 text-xs text-white/50">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold" />
              <a href="tel:+923015025862" className="hover:text-gold">+92 301 502 5862</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold" />
              <a href="mailto:mudassirchadhar789@gmail.com" className="break-all hover:text-gold">
                mudassirchadhar789@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold" />
              109-A Satellite Town, Sargodha, Pakistan
            </li>
          </ul>
          <Link href="/contact" className="mt-6 inline-block border border-gold px-5 py-2 text-xs font-bold uppercase tracking-widest text-gold transition hover:bg-gold hover:text-white">
            Get Free Quote
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} New Toheed Glass & Accessories. All rights reserved.
          </p>
          <div className="flex gap-5 text-[11px] text-white/30">
            <Link href="/products" className="hover:text-gold">Products</Link>
            <Link href="/gallery" className="hover:text-gold">Projects</Link>
            <Link href="/contact" className="hover:text-gold">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
