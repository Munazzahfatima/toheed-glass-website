import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().optional(),
  message: z.string().min(3),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        city: data.city,
        message: data.message,
      },
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(inquiries);
}
