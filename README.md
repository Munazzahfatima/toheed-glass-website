# New Toheed Glass & Accessories — Website & Admin Platform

A production-ready Next.js 14 application for New Toheed Glass & Accessories: a manufacturer of LED
mirrors, decorative glass, custom glass designs, interior glass solutions and LED mirror clocks.

## Tech Stack
- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS (custom navy/gold luxury theme)
- PostgreSQL + Prisma ORM
- NextAuth (Credentials provider) for admin authentication
- WhatsApp order/inquiry notifications via `wa.me` deep links

## 1. Prerequisites
- Node.js 18+
- A PostgreSQL database (local, Docker, Supabase, Railway, Neon, etc.)

## 2. Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/new_toheed_glass?schema=public"
NEXTAUTH_SECRET="generate with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="923015025862"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Create the database schema:
```bash
npx prisma migrate dev --name init
```

Seed sample data (admin account, LED colors, sample products):
```bash
npm run seed
```

This creates an admin login:
- **Email:** admin@newtoheedglass.com
- **Password:** Admin@12345

⚠️ Change this password immediately after first login via **Admin → Settings → Change Password**.

Run the dev server:
```bash
npm run dev
```

Visit `http://localhost:3000` for the storefront and `http://localhost:3000/admin/login` for the
admin dashboard.

## 3. Project Structure

```
src/
  app/
    page.tsx                 Home page
    about/                   About Us
    products/                Product listing + [slug] ordering wizard
    gallery/                 Project gallery
    contact/                 Contact form, WhatsApp, map
    admin/
      login/                 Admin login
      (protected)/           Sidebar-protected admin dashboard
        dashboard/           Overview & stats
        products/            Product CRUD
        colors/              LED color CRUD
        orders/              Order management + status updates
        gallery/             Gallery CRUD
        inquiries/           Customer inquiries
        settings/            Installation/delivery + password
    api/                     REST API routes (products, colors, orders, gallery, inquiries, settings, auth)
  components/                Navbar, Footer, OrderWizard, forms, admin UI
  lib/                       prisma client, auth config, pricing engine, WhatsApp message builder
prisma/
  schema.prisma              Full data model
  seed.ts                    Sample data
```

## 4. How Pricing & Ordering Works
- Each **Product** has a `pricingType` of `PER_SQFT` or `FIXED`, set by the admin per design.
- LED Mirrors typically use `PER_SQFT`: price = (width × height / 144) × pricePerSqft.
- LED Mirror Clocks use `FIXED`: a single fixed price for a fixed size, no dimension selection.
- The customer-facing order wizard (`components/OrderWizard.tsx`) walks through: shape → size
  (standard or custom) → LED color → live price → customer details → summary → confirmation.
- Selecting **Custom Size** opens a WhatsApp chat instead of an inline price, as requested.
- On confirmation, the order is saved to the database **and** a formatted WhatsApp message is
  opened for the business owner, matching the required message template.
- All prices are recalculated server-side in `/api/orders` from the current product/color/settings
  records — the client-side number is for display only, preventing price tampering.

## 5. Admin Capabilities
- Products: add/edit/delete, multiple images (URLs), featured flag, active/inactive, shapes, pricing rule.
- LED Colors: add/edit/delete, enable/disable, preview swatch, extra charge, applied per-product.
- Orders: search, filter by status, update status (Pending → Confirmed → In Production → Ready → Delivered).
- Gallery: upload/manage project photos.
- Inquiries: view submissions from the contact form, reply directly via WhatsApp.
- Settings: installation charge, delivery charges, free-delivery threshold, production/delivery estimates, WhatsApp number, password change.

> **Image hosting:** this scaffold accepts image **URLs** (e.g. from Cloudinary, S3, Imgur, or any
> CDN) rather than direct file uploads, to keep the app deployable without extra storage
> configuration. To add direct uploads, wire up a provider like Uploadthing, Cloudinary, or S3 and
> swap the URL inputs in `ProductForm.tsx` / gallery admin for an upload widget.

## 6. Deployment Notes
- Deploy easily to Vercel; add a managed Postgres (Vercel Postgres, Neon, Supabase, Railway).
- Set the same environment variables in your hosting provider.
- Run `npx prisma migrate deploy` as part of your build/release step.
- Update `NEXT_PUBLIC_SITE_URL` and `NEXTAUTH_URL` to your production domain.

## 7. Future Scalability
The schema and architecture are intentionally structured to support, without breaking changes:
- Online payments (extend `Order` with a `paymentStatus`/`paymentRef`, add a payments API route)
- Customer accounts (add a `Customer` model + NextAuth customer provider)
- Inventory management (add a `stock` field / `InventoryLog` model)
- Delivery tracking (extend `OrderStatus` history with timestamps)
- Multiple admin users with roles (already modeled via `Admin.role`)
- Multi-branch management (add a `Branch` model and scope products/orders to it)

## 8. Security
- Admin routes protected by NextAuth middleware (`src/middleware.ts`).
- Passwords hashed with bcrypt.
- All write API routes require an authenticated admin session.
- Input validation via Zod on public-facing endpoints (orders, inquiries).
- Order pricing is always recalculated server-side, never trusted from the client.
