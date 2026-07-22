export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/products/:path*", "/admin/orders/:path*", "/admin/colors/:path*", "/admin/gallery/:path*", "/admin/inquiries/:path*", "/admin/settings/:path*"],
};
