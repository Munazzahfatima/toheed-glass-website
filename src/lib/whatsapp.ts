const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923366001040";

export function getWhatsappLink(message: string, number: string = WHATSAPP_NUMBER) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function buildInquiryWhatsappMessage(inquiry: {
  name: string;
  phone: string;
  message: string;
}) {
  return `*New Inquiry*\nName: ${inquiry.name}\nPhone: ${inquiry.phone}\nMessage: ${inquiry.message}`;
}
