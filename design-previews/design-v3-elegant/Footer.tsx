import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-4">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Logo" width={44} height={44}
                   className="h-11 w-11 rounded-xl bg-white object-contain p-1" />
            <div>
              <p className="font-bold text-white" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem" }}>
                New Toheed Glass
              </p>
              <p className="text-[10px] tracking-[0.2em] text-teal uppercase">&amp; Accessories</p>
            </div>
          </Link>
          <p className="mt-5 text-xs leading-relaxed text-white/45">
            Pakistan's trusted manufacturer and supplier of decorative and architectural glass solutions for residential and commercial projects.
          </p>
          <div className="mt-6 h-px bg-white/8" />
          <p className="mt-4 text-[10px] uppercase tracking-widest text-white/25">Sargodha, Pakistan</p>
        </div>

        {/* Decorative Glass */}
        <div>
          <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-teal">
            Decorative Glass
          </h4>
          <ul className="space-y-3">
            {["Ceiling Glass", "LED Smart Mirrors", "Beveled Mirror Walls", "Frosted Glass", "Original Stained Glass", "Artistic Stained Glass"].map((item) => (
              <li key={item}>
                <Link href="/products?category=DECORATIVE_GLASS"
                      className="text-xs text-white/45 transition hover:text-teal-light">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Architectural Glass */}
        <div>
          <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-teal">
            Architectural Glass
          </h4>
          <ul className="space-y-3">
            {["ACP Wall Cladding", "Glass Curtain Wall", "Glass Shop Front", "Office Partition", "Shower Cabin", "Stairs & Terrace Railings"].map((item) => (
              <li key={item}>
                <Link href="/products?category=ARCHITECTURAL_GLASS"
                      className="text-xs text-white/45 transition hover:text-teal-light">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-teal">
            Get In Touch
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal" />
              <a href="tel:+923015025862" className="text-xs text-white/45 transition hover:text-white">
                +92 301 502 5862
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal" />
              <a href="mailto:mudassirchadhar789@gmail.com"
                 className="break-all text-xs text-white/45 transition hover:text-white">
                mudassirchadhar789@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal" />
              <span className="text-xs text-white/45">109-A Satellite Town, Sargodha, Pakistan</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal" />
              <span className="text-xs text-white/45">Mon – Sat: 10:00 AM – 8:00 PM</span>
            </li>
          </ul>
          <Link href="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-lg border border-teal/40 px-5 py-2.5 text-xs font-semibold text-teal transition hover:bg-teal hover:text-white hover:border-teal">
            Get Free Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} New Toheed Glass &amp; Accessories. All rights reserved.
          </p>
          <div className="flex gap-5 text-[11px] text-white/25">
            {[["Products","/products"],["Projects","/gallery"],["About","/about"],["Contact","/contact"]].map(([l,h]) => (
              <Link key={h} href={h} className="transition hover:text-teal">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
