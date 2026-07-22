import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const color = await prisma.ledColor.update({
    where: { id: params.id },
    data: {
      name: body.name,
      hexPreview: body.hexPreview,
      previewImage: body.previewImage,
      description: body.description,
      extraCharge: body.extraCharge,
      isActive: body.isActive,
      sortOrder: body.sortOrder,
    },
  });
  return NextResponse.json(color);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.ledColor.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
