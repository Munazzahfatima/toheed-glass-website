import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  const wa = getWhatsappLink("Hi! I'd like to know more about your glass products.");

  return (
    <footer className="bg-navy text-white">
      <div className="container-luxe grid gap-10 py-14 md:grid-cols-4">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="New Toheed Glass" width={44} height={44}
                   className="h-11 w-11 rounded bg-white object-contain p-1" />
            <div>
              <p className="font-serif text-base font-bold text-white">New Toheed Glass</p>
              <p className="text-[10px] uppercase tracking-widest text-gold">&amp; Accessories</p>
            </div>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            Welcome to New Toheed Glass, manufacturer and supplier of premium decorative and
            architectural glass solutions in Pakistan.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://www.facebook.com/share/1Czs54fZmQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
               className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-gold hover:text-white">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/new_toheed_glass?igsh=MThram0xYW4zbW5wNg==" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-gold hover:text-white">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer"
               className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] transition hover:bg-[#25D366] hover:text-white">
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Popular Products — each links straight to its own product page */}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Popular Products</h4>
          <ul className="space-y-2">
            {[
              { name: "Decorative LED Smart Mirror", slug: "decorative-led-smart-mirror" },
              { name: "Decorative Beveled Mirror Wall", slug: "decorative-beveled-mirror-wall" },
              { name: "Frosted Glass", slug: "frosted-glass" },
              { name: "Shower Cabin", slug: "shower-cabin" },
              { name: "Stairs Glass Railing", slug: "stairs-glass-railing" },
              { name: "Glass Curtain Wall", slug: "glass-curtain-wall" },
              { name: "Office Glass Partition", slug: "office-glass-partition" },
              { name: "Tempered Glass", slug: "tempered-glass" },
            ].map((i) => (
              <li key={i.slug}>
                <Link href={`/products/${i.slug}`}
                      className="text-sm text-white/50 transition hover:text-gold">{i.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop by Category */}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Shop by Category</h4>
          <ul className="space-y-2">
            {[
              { name: "Decorative", value: "DECORATIVE" },
              { name: "Residential", value: "RESIDENTIAL" },
              { name: "Commercial", value: "COMMERCIAL" },
              { name: "Safety", value: "SAFETY" },
            ].map((c) => (
              <li key={c.value}>
                <Link href={`/products?category=${c.value}`}
                      className="text-sm text-white/50 transition hover:text-gold">{c.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="text-sm font-semibold text-gold transition hover:text-white">
                View All Products →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Hotline Number</h4>
          <ul className="space-y-3">
            <li>
              <a href="tel:+923366001040"
                 className="flex items-center gap-2 text-sm font-semibold text-white transition hover:text-gold">
                <Phone className="h-4 w-4 text-gold" /> +92 336 6001040
              </a>
            </li>
            <li>
              <a href="mailto:mudassirchadhar789@gmail.com"
                 className="flex items-start gap-2 break-all text-sm text-white/50 transition hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                mudassirchadhar789@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=109-A%2C%20near%20Zafar%20Ullah%20Chowk%2C%20Sargodha%2C%2040100%2C%20Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-white/50 transition hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                109-A, near Zafar Ullah Chowk, Sargodha, 40100, Pakistan
              </a>
            </li>
          </ul>

          <div className="mt-6 space-y-2">
            <Link href="/contact"
                  className="block rounded-full bg-gold py-2.5 text-center text-sm font-semibold text-white transition hover:bg-gold-dark">
              Get Free Quote
            </Link>
            <a href={wa} target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/30 sm:flex-row">
          <p>© {new Date().getFullYear()} New Toheed Glass &amp; Accessories. All rights reserved.</p>
          <div className="flex gap-4">
            {[["Products","/products"],["Projects","/gallery"],["About","/about"],["Contact","/contact"]].map(([l,h]) => (
              <Link key={h} href={h} className="transition hover:text-gold">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
