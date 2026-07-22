import { ShieldCheck, Target, Eye, Hammer, Award } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <section className="bg-glass-gradient py-20">
        <div className="container-luxe text-center">
          <span className="section-eyebrow">Our Story</span>
          <h1 className="mt-3 text-4xl font-bold text-navy sm:text-5xl">About New Toheed Glass &amp; Accessories</h1>
          <p className="mx-auto mt-6 max-w-2xl text-navy/70">
            A trusted manufacturer and supplier of premium LED mirrors, decorative glass, custom glass
            designs, interior glass solutions, LED mirror clocks and glass accessories, based in
            Sargodha, Pakistan.
          </p>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="card-luxe p-8">
            <Target className="h-8 w-8 text-gold" />
            <h2 className="mt-4 font-serif text-2xl font-semibold text-navy">Our Mission</h2>
            <p className="mt-3 text-navy/60">
              To craft premium, custom-designed glass and LED mirror solutions that elevate every space
              we touch — from private homes to hotels, salons and commercial interiors — while
              maintaining uncompromising standards of quality and craftsmanship.
            </p>
          </div>
          <div className="card-luxe p-8">
            <Eye className="h-8 w-8 text-gold" />
            <h2 className="mt-4 font-serif text-2xl font-semibold text-navy">Our Vision</h2>
            <p className="mt-3 text-navy/60">
              To become Pakistan&rsquo;s most trusted name in luxury glass manufacturing, known for
              precision engineering, elegant design and dependable service to homeowners, businesses
              and design professionals nationwide.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy/[0.03] py-20">
        <div className="container-luxe">
          <div className="mb-12 text-center">
            <span className="section-eyebrow">What Sets Us Apart</span>
            <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">Manufacturing Expertise</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Hammer, title: "In-House Manufacturing", desc: "Full production control from raw glass to finished LED mirror." },
              { icon: ShieldCheck, title: "Quality Assurance", desc: "Every piece inspected for finish, safety and LED performance." },
              { icon: Award, title: "Skilled Craftsmanship", desc: "Experienced technicians and designers behind every order." },
              { icon: Target, title: "Precision Sizing", desc: "Standard and fully custom dimensions manufactured to spec." },
            ].map((f) => (
              <div key={f.title} className="card-luxe p-6 text-center">
                <f.icon className="mx-auto h-8 w-8 text-gold" />
                <h3 className="mt-4 font-serif font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm text-navy/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe py-20 text-center">
        <div className="glass-panel mx-auto max-w-2xl rounded-3xl p-12">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Let&rsquo;s Build Something Elegant Together</h2>
          <p className="mt-4 text-navy/60">Get in touch for a custom quote tailored to your space.</p>
          <Link href="/contact" className="btn-primary mt-6 inline-flex">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
