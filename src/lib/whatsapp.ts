const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923015025862";

export function getWhatsappLink(message: string, number: string = WHATSAPP_NUMBER) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function buildOrderWhatsappMessage(order: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  categoryLabel: string;
  productName: string;
  dimensions?: string;
  colorName?: string;
  pricingRuleLabel: string;
  totalPrice: string;
  notes?: string;
}) {
  return `*New Order Received*
Order #: ${order.orderNumber}

*Customer Name:* ${order.customerName}
*Phone:* ${order.customerPhone}
*City:* ${order.customerCity}
*Address:* ${order.customerAddress}

*Product Category:* ${order.categoryLabel}
*Design:* ${order.productName}
${order.dimensions ? `*Dimensions:* ${order.dimensions}\n` : ""}${
    order.colorName ? `*LED Color:* ${order.colorName}\n` : ""
  }
*Price Rule:* ${order.pricingRuleLabel}
*Total Price:* PKR ${order.totalPrice}

*Notes:* ${order.notes || "-"}

Please contact customer for confirmation.`;
}

export function buildCustomSizeWhatsappMessage(productName: string) {
  return `Hi, I'm interested in a *custom size* for "${productName}". Please contact me to discuss dimensions and pricing.`;
}

export function buildInquiryWhatsappMessage(inquiry: {
  name: string;
  phone: string;
  message: string;
}) {
  return `*New Inquiry*\nName: ${inquiry.name}\nPhone: ${inquiry.phone}\nMessage: ${inquiry.message}`;
}
