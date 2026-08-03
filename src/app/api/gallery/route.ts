import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { syncAndGetProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const fallbackProjects = syncAndGetProjects();
  try {
    const items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
    const validDbItems = items.filter(item => item.imageUrl && item.imageUrl.includes("/projects/"));
    return NextResponse.json(validDbItems.length > 0 ? validDbItems : fallbackProjects);
  } catch {
    return NextResponse.json(fallbackProjects);
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = await prisma.galleryItem.create({
    data: { title: body.title, category: body.category || null, imageUrl: body.imageUrl },
  });
  return NextResponse.json(item, { status: 201 });
}
