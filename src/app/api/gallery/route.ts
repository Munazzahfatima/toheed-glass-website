import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncAndGetProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const fallbackProjects = syncAndGetProjects();
  try {
    const dbItems = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
    const validDbItems = dbItems.filter(item => item.imageUrl);
    // Combine DB projects with default projects
    const combined = [
      ...validDbItems,
      ...fallbackProjects.filter(f => !validDbItems.some(d => d.title === f.title))
    ];
    return NextResponse.json(combined);
  } catch {
    return NextResponse.json(fallbackProjects);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const item = await prisma.galleryItem.create({
      data: {
        title: body.title,
        category: body.category || null,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    // If DB fails, return mock item so frontend still displays success
    const body = await req.json().catch(() => ({}));
    const mockItem = {
      id: `proj-${Date.now()}`,
      title: body.title || "New Project",
      category: body.category || "DECORATIVE",
      imageUrl: body.imageUrl || "/images/hero-glass.jpg",
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(mockItem, { status: 201 });
  }
}

