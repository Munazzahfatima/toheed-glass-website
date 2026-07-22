import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { calculateProductCost, calculateDeliveryCost, generateOrderNumber } from "@/lib/pricing";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  productId: z.string(),
  colorId: z.string().optional(),
  shape: z.enum(["RECTANGLE", "SQUARE", "ROUND", "OVAL"]).optional(),
  widthInches: z.number().optional(),
  heightInches: z.number().optional(),
  isCustomSize: z.boolean().optional(),
  customerName: z.string().min(2),
  customerPhone: z.string().min(6),
  customerCity: z.string().min(2),
  customerAddress: z.string().min(4),
  notes: z.string().optional(),
  wantsInstallation: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const product = await prisma.product.findUnique({ where: { id: data.productId } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const color = data.colorId ? await prisma.ledColor.findUnique({ where: { id: data.colorId } }) : null;
    const settings = await prisma.settings.findUnique({ where: { id: "settings" } });
    const cityRate = await prisma.deliveryCityRate.findUnique({ where: { city: data.customerCity } });

    const productCost = calculateProductCost({
      pricingType: product.pricingType as any,
      pricePerSqft: product.pricePerSqft ? Number(product.pricePerSqft) : null,
      fixedPrice: product.fixedPrice ? Number(product.fixedPrice) : null,
      widthInches: data.widthInches,
      heightInches: data.heightInches,
    });

    const colorCost = color ? Number(color.extraCharge) : 0;
    const subtotal = productCost + colorCost;

    const installationCost =
      data.wantsInstallation && settings?.installationEnabled ? Number(settings.installationCharge) : 0;

    const deliveryCost = calculateDeliveryCost({
      cityRate: cityRate ? Number(cityRate.charge) : null,
      defaultRate: settings ? Number(settings.defaultDeliveryCharge) : 0,
      freeThreshold: settings ? Number(settings.freeDeliveryThreshold) : 0,
      subtotal,
    });

    const totalPrice = subtotal + installationCost + deliveryCost;

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        productId: product.id,
        colorId: color?.id,
        shape: data.shape,
        widthInches: data.widthInches,
        heightInches: data.heightInches,
        isCustomSize: !!data.isCustomSize,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerCity: data.customerCity,
        customerAddress: data.customerAddress,
        notes: data.notes,
        wantsInstallation: !!data.wantsInstallation,
        productCost,
        colorCost,
        installationCost,
        deliveryCost,
        totalPrice,
      },
      include: { product: true, color: true },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Invalid order data" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const orders = await prisma.order.findMany({
    where: {
      ...(status ? { status: status as any } : {}),
      ...(search
        ? {
            OR: [
              { customerName: { contains: search, mode: "insensitive" } },
              { customerPhone: { contains: search } },
              { orderNumber: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { product: true, color: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
