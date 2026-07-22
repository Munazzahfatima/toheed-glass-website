import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  let settings = await prisma.settings.findUnique({ where: { id: "settings" } });
  if (!settings) {
    settings = await prisma.settings.create({ data: { id: "settings" } });
  }
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const settings = await prisma.settings.upsert({
    where: { id: "settings" },
    update: body,
    create: { id: "settings", ...body },
  });
  return NextResponse.json(settings);
}
