"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderKanban,
  MessageSquareText,
  Settings,
  Home,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/gallery", label: "Projects", icon: FolderKanban },
  { href: "/admin/inquiries", label: "Quotes & Messages", icon: MessageSquareText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-navy/10 bg-white lg:block">
      <div className="flex items-center gap-3 border-b border-navy/10 p-6">
        <Image src="/images/logo.png" alt="Logo" width={36} height={36} className="h-9 w-9 object-contain" />
        <span className="font-serif font-semibold text-navy">Admin Panel</span>
      </div>
      <nav className="space-y-1 p-4">
        {links.map((l) => {
          const active = pathname === l.href || pathname?.startsWith(l.href + "/");
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                active ? "bg-navy text-white" : "text-navy/60 hover:bg-navy/5"
              }`}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          );
        })}
        <button
          onClick={() => router.push("/")}
          className="mt-6 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-navy/60 hover:bg-navy/5"
        >
          <Home className="h-4 w-4" />
          View Website
        </button>
      </nav>
    </aside>
  );
}

