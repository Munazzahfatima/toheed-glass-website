import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { getWhatsappLink } from "@/lib/whatsapp";

export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <section className="container-luxe py-20">
      <div className="mb-12 text-center">
        <span className="section-eyebrow">Get In Touch</span>
        <h1 className="mt-3 text-4xl font-bold text-navy sm:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-xl text-navy/60">
          Have a question or need a custom quote? Reach out and our team will get back to you shortly.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="card-luxe p-8">
            <h2 className="font-serif text-xl font-semibold text-navy">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="card-luxe space-y-5 p-8">
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="font-semibold text-navy">Phone / WhatsApp</p>
                <p className="text-sm text-navy/60">+92 336 6001040</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="font-semibold text-navy">Email</p>
                <p className="text-sm text-navy/60">mudassirchadhar789@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="font-semibold text-navy">Address</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=109-A%2C%20near%20Zafar%20Ullah%20Chowk%2C%20Sargodha%2C%2040100%2C%20Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-navy/60 transition hover:text-navy hover:underline"
                >
                  109-A, near Zafar Ullah Chowk, Sargodha, 40100, Pakistan
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="font-semibold text-navy">Business Hours</p>
                <p className="text-sm text-navy/60">Sat – Thu: 10:00 AM – 8:00 PM</p>
                <p className="text-xs font-medium text-amber-600">Friday: Closed (Off)</p>
              </div>
            </div>
            <a
              href={getWhatsappLink("Hi, I'd like to know more about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="card-luxe flex h-56 items-center justify-center overflow-hidden">
            <iframe
              title="Business Location"
              className="h-full w-full"
              loading="lazy"
              src="https://www.google.com/maps?q=109-A%2C+near+Zafar+Ullah+Chowk%2C+Sargodha%2C+40100%2C+Pakistan&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
