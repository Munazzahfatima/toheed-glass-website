import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { slugify } from "@/lib/slugify";

export const dynamic = "force-dynamic";

export async function GET() {
  const colors = await prisma.ledColor.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(colors);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const color = await prisma.ledColor.create({
    data: {
      name: body.name,
      slug: `${slugify(body.name)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      hexPreview: body.hexPreview,
      previewImage: body.previewImage,
      description: body.description,
      extraCharge: body.extraCharge || 0,
      isActive: body.isActive !== false,
    },
  });
  return NextResponse.json(color, { status: 201 });
}
