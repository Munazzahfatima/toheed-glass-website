"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { formatPKR } from "@/lib/pricing";
import { getWhatsappLink, buildCustomSizeWhatsappMessage } from "@/lib/whatsapp";
import { CheckCircle2 } from "lucide-react";

type Color = {
  id: string;
  name: string;
  hexPreview: string | null;
  previewImage: string | null;
  description: string | null;
  extraCharge: number;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  pricingType: "PER_SQFT" | "FIXED";
  pricePerSqft: number | null;
  fixedPrice: number | null;
  fixedSize: string | null;
  shapes: string[];
  images: string[];
  colors: Color[];
};

const STANDARD_SIZES = [
  { label: "24 x 24", w: 24, h: 24 },
  { label: "24 x 36", w: 24, h: 36 },
  { label: "36 x 36", w: 36, h: 36 },
  { label: "36 x 48", w: 36, h: 48 },
  { label: "48 x 60", w: 48, h: 60 },
];

export default function OrderWizard({
  product,
  installationEnabled,
  installationCharge,
}: {
  product: Product;
  installationEnabled: boolean;
  installationCharge: number;
}) {
  const isFixed = product.pricingType === "FIXED";
  const [step, setStep] = useState(1);
  const [shape, setShape] = useState<string>(product.shapes[0] || "RECTANGLE");
  const [sizeMode, setSizeMode] = useState<"standard" | "custom">("standard");
  const [selectedSize, setSelectedSize] = useState(STANDARD_SIZES[0]);
  const [colorId, setColorId] = useState<string | null>(product.colors[0]?.id ?? null);
  const [wantsInstallation, setWantsInstallation] = useState(false);
  const [details, setDetails] = useState({ name: "", phone: "", city: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const selectedColor = product.colors.find((c) => c.id === colorId);

  const productCost = useMemo(() => {
    if (isFixed) return product.fixedPrice || 0;
    if (!product.pricePerSqft) return 0;
    const sqft = (selectedSize.w * selectedSize.h) / 144;
    return Math.round(sqft * product.pricePerSqft);
  }, [isFixed, product, selectedSize]);

  const colorCost = selectedColor?.extraCharge || 0;
  const installCost = wantsInstallation && installationEnabled ? installationCharge : 0;
  const total = productCost + colorCost + installCost;

  const totalSteps = isFixed ? 4 : 6; // design(implicit)+color, details, summary vs full flow

  async function handleConfirm() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          colorId: colorId || undefined,
          shape: isFixed ? undefined : shape,
          widthInches: isFixed ? undefined : selectedSize.w,
          heightInches: isFixed ? undefined : selectedSize.h,
          isCustomSize: false,
          customerName: details.name,
          customerPhone: details.phone,
          customerCity: details.city,
          customerAddress: details.address,
          notes: details.notes,
          wantsInstallation,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");
      setConfirmedOrder(data.order);

      const waMessage = `*New Order Received*
Order #: ${data.order.orderNumber}

*Customer Name:* ${details.name}
*Phone:* ${details.phone}
*City:* ${details.city}
*Address:* ${details.address}

*Product Category:* ${product.category.replaceAll("_", " ")}
*Design:* ${product.name}
${!isFixed ? `*Dimensions:* ${selectedSize.label} inches (${shape})\n` : ""}${
        selectedColor ? `*LED Color:* ${selectedColor.name}\n` : ""
      }
*Price Rule:* ${isFixed ? "Fixed Price" : "Per Square Foot"}
*Total Price:* PKR ${formatPKR(total)}

*Notes:* ${details.notes || "-"}

Please contact customer for confirmation.`;

      window.open(getWhatsappLink(waMessage), "_blank");
      setStep(step + 1);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmedOrder) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-gold" />
        <h1 className="mt-6 font-serif text-3xl font-bold text-navy">Order Confirmed!</h1>
        <p className="mt-3 text-navy/60">
          Thank you, {details.name}. Your order <span className="font-semibold text-navy">#{confirmedOrder.orderNumber}</span> has
          been received. Our team will contact you shortly on WhatsApp to confirm details.
        </p>
        <div className="card-luxe mt-8 p-6 text-left text-sm">
          <div className="flex justify-between border-b border-navy/5 py-2"><span>Design</span><span className="font-medium">{product.name}</span></div>
          {!isFixed && <div className="flex justify-between border-b border-navy/5 py-2"><span>Size</span><span className="font-medium">{selectedSize.label} in ({shape})</span></div>}
          {selectedColor && <div className="flex justify-between border-b border-navy/5 py-2"><span>LED Color</span><span className="font-medium">{selectedColor.name}</span></div>}
          <div className="flex justify-between pt-3 text-base font-semibold text-navy"><span>Total</span><span>PKR {formatPKR(total)}</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Product images */}
      <div>
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-navy/5 shadow-luxury">
          {product.images[0] ? (
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-navy/30">No Image</div>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.slice(1, 5).map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-navy/5">
                <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
        <h1 className="mt-8 font-serif text-3xl font-bold text-navy">{product.name}</h1>
        <p className="mt-3 text-navy/60">{product.description}</p>
        {isFixed && product.fixedSize && (
          <p className="mt-2 text-sm text-navy/50">Fixed Size: {product.fixedSize}</p>
        )}
      </div>

      {/* Order Wizard */}
      <div className="card-luxe p-8">
        <div className="mb-8 flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-gold" : "bg-navy/10"}`} />
          ))}
        </div>

        {/* STEP: Shape (skip for fixed) */}
        {!isFixed && step === 1 && (
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">Step 1: Select Shape</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {product.shapes.map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`rounded-xl border py-4 text-sm font-medium capitalize transition ${
                    shape === s ? "border-gold bg-gold/10 text-navy" : "border-navy/10 text-navy/60 hover:border-gold"
                  }`}
                >
                  {s.toLowerCase()}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="btn-primary mt-8 w-full">Continue</button>
          </div>
        )}

        {/* STEP: Dimensions (skip for fixed) */}
        {!isFixed && step === 2 && (
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">Step 2: Select Dimensions</h2>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setSizeMode("standard")}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium ${sizeMode === "standard" ? "border-gold bg-gold/10" : "border-navy/10"}`}
              >
                Standard Sizes
              </button>
              <button
                onClick={() => setSizeMode("custom")}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium ${sizeMode === "custom" ? "border-gold bg-gold/10" : "border-navy/10"}`}
              >
                Custom Size
              </button>
            </div>

            {sizeMode === "standard" ? (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {STANDARD_SIZES.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-xl border py-3 text-sm font-medium transition ${
                      selectedSize.label === s.label ? "border-gold bg-gold/10 text-navy" : "border-navy/10 text-navy/60 hover:border-gold"
                    }`}
                  >
                    {s.label} in
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-gold/40 bg-gold/5 p-5 text-center">
                <p className="text-sm text-navy/70">
                  Custom sizes require a quick chat with our team for accurate pricing.
                </p>
                <a
                  href={getWhatsappLink(buildCustomSizeWhatsappMessage(product.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-4 inline-flex"
                >
                  Chat on WhatsApp for Custom Size
                </a>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
              {sizeMode === "standard" && (
                <button onClick={() => setStep(3)} className="btn-primary flex-1">Continue</button>
              )}
            </div>
          </div>
        )}

        {/* STEP: LED Color */}
        {((isFixed && step === 1) || (!isFixed && step === 3)) && (
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">
              {isFixed ? "Step 1: Select LED Color" : "Step 3: Select LED Color"}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColorId(c.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    colorId === c.id ? "border-gold bg-gold/10" : "border-navy/10 hover:border-gold"
                  }`}
                >
                  <div
                    className="h-8 w-8 rounded-full border border-navy/10"
                    style={{ backgroundColor: c.hexPreview || "#eee" }}
                  />
                  <p className="mt-2 text-xs font-medium text-navy">{c.name}</p>
                  {c.extraCharge > 0 && <p className="text-[11px] text-gold">+PKR {formatPKR(c.extraCharge)}</p>}
                </button>
              ))}
              {product.colors.length === 0 && (
                <p className="col-span-full text-sm text-navy/50">No LED colors configured for this product yet.</p>
              )}
            </div>
            <div className="mt-8 flex gap-3">
              {!isFixed && <button onClick={() => setStep(2)} className="btn-secondary flex-1">Back</button>}
              <button onClick={() => setStep(isFixed ? 2 : 4)} className="btn-primary flex-1">Continue</button>
            </div>
          </div>
        )}

        {/* STEP: Price Display */}
        {((isFixed && step === 2) || (!isFixed && step === 4)) && (
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">Dynamic Price Calculation</h2>
            <div className="mt-5 space-y-2 rounded-xl border border-navy/10 p-5 text-sm">
              <div className="flex justify-between"><span className="text-navy/60">Product Cost</span><span className="font-medium">PKR {formatPKR(productCost)}</span></div>
              {colorCost > 0 && <div className="flex justify-between"><span className="text-navy/60">LED Color Add-on</span><span className="font-medium">PKR {formatPKR(colorCost)}</span></div>}
              <div className="flex justify-between border-t border-navy/10 pt-3 text-base font-semibold text-navy"><span>Subtotal</span><span>PKR {formatPKR(productCost + colorCost)}</span></div>
            </div>

            {installationEnabled && (
              <label className="mt-5 flex items-center gap-3 rounded-xl border border-navy/10 p-4 text-sm">
                <input type="checkbox" checked={wantsInstallation} onChange={(e) => setWantsInstallation(e.target.checked)} className="h-4 w-4 accent-gold" />
                <span>Add Professional Installation (+PKR {formatPKR(installationCharge)})</span>
              </label>
            )}

            <div className="mt-8 flex gap-3">
              <button onClick={() => setStep(isFixed ? 1 : 3)} className="btn-secondary flex-1">Back</button>
              <button onClick={() => setStep(isFixed ? 3 : 5)} className="btn-primary flex-1">Continue</button>
            </div>
          </div>
        )}

        {/* STEP: Customer Details */}
        {((isFixed && step === 3) || (!isFixed && step === 5)) && (
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">Your Details</h2>
            <div className="mt-5 space-y-3">
              <input placeholder="Full Name" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} className="w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
              <input placeholder="Phone Number" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} className="w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
              <input placeholder="City" value={details.city} onChange={(e) => setDetails({ ...details, city: e.target.value })} className="w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
              <textarea placeholder="Full Address" rows={2} value={details.address} onChange={(e) => setDetails({ ...details, address: e.target.value })} className="w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
              <textarea placeholder="Additional Notes (optional)" rows={2} value={details.notes} onChange={(e) => setDetails({ ...details, notes: e.target.value })} className="w-full rounded-xl border border-navy/10 px-4 py-3 text-sm focus:border-gold" />
            </div>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setStep(isFixed ? 2 : 4)} className="btn-secondary flex-1">Back</button>
              <button
                disabled={!details.name || !details.phone || !details.city || !details.address}
                onClick={() => setStep(isFixed ? 4 : 6)}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                Review Order
              </button>
            </div>
          </div>
        )}

        {/* STEP: Order Summary */}
        {((isFixed && step === 4) || (!isFixed && step === 6)) && (
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">Order Summary</h2>
            <div className="mt-5 space-y-2 rounded-xl border border-navy/10 p-5 text-sm">
              <div className="flex justify-between border-b border-navy/5 py-2"><span className="text-navy/60">Design</span><span className="font-medium">{product.name}</span></div>
              {!isFixed && <div className="flex justify-between border-b border-navy/5 py-2"><span className="text-navy/60">Shape / Size</span><span className="font-medium">{shape} — {selectedSize.label} in</span></div>}
              {selectedColor && <div className="flex justify-between border-b border-navy/5 py-2"><span className="text-navy/60">LED Color</span><span className="font-medium">{selectedColor.name}</span></div>}
              <div className="flex justify-between border-b border-navy/5 py-2"><span className="text-navy/60">Customer</span><span className="font-medium">{details.name}, {details.city}</span></div>
              {wantsInstallation && <div className="flex justify-between border-b border-navy/5 py-2"><span className="text-navy/60">Installation</span><span className="font-medium">PKR {formatPKR(installCost)}</span></div>}
              <div className="flex justify-between pt-3 text-base font-semibold text-navy"><span>Total</span><span>PKR {formatPKR(total)}</span></div>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <div className="mt-8 flex gap-3">
              <button onClick={() => setStep(isFixed ? 3 : 5)} className="btn-secondary flex-1">Back</button>
              <button disabled={submitting} onClick={handleConfirm} className="btn-primary flex-1 disabled:opacity-60">
                {submitting ? "Placing Order..." : "Confirm Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
