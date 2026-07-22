"use client";

import { useEffect, useState } from "react";
import { getWhatsappLink } from "@/lib/whatsapp";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/inquiries").then((r) => r.json()).then(setInquiries);
  }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Customer Inquiries</h1>
      <div className="mt-6 space-y-4">
        {inquiries.length === 0 && <p className="text-sm text-navy/50">No inquiries yet.</p>}
        {inquiries.map((i) => (
          <div key={i.id} className="card-luxe p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-navy">{i.name} · {i.phone}</p>
                <p className="text-xs text-navy/50">{i.city || "-"} · {new Date(i.createdAt).toLocaleString()}</p>
              </div>
              <a href={getWhatsappLink(`Hi ${i.name}, thank you for reaching out to New Toheed Glass & Accessories.`, i.phone.replace(/\D/g, ""))} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">
                Reply on WhatsApp
              </a>
            </div>
            <p className="mt-3 text-sm text-navy/70">{i.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
