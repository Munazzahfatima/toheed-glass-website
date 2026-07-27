-- New 4-group category system: DECORATIVE, RESIDENTIAL, COMMERCIAL, SAFETY
-- Replaces the old 2-value enum (DECORATIVE_GLASS, ARCHITECTURAL_GLASS) and
-- switches Product from a single `category` to a multi-select `categories` array,
-- so a product (e.g. Double Glazed Glass) can appear under more than one group.

-- 1) Create the new enum type
CREATE TYPE "ProductCategory_new" AS ENUM ('DECORATIVE', 'RESIDENTIAL', 'COMMERCIAL', 'SAFETY');

-- 2) Add the new multi-value column on Product (starts empty; backfilled by
--    prisma/assign-categories.ts right after this migration runs)
ALTER TABLE "Product" ADD COLUMN "categories" "ProductCategory_new"[] NOT NULL DEFAULT '{}';

-- 3) Drop the old single-value column
ALTER TABLE "Product" DROP COLUMN "category";

-- 4) GalleryItem.category used the old enum values too (was never populated by
--    seed data) — reset it to NULL and point it at the new enum type
ALTER TABLE "GalleryItem" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "GalleryItem" ALTER COLUMN "category" TYPE "ProductCategory_new" USING NULL;

-- 5) Swap the enum types
DROP TYPE "ProductCategory";
ALTER TYPE "ProductCategory_new" RENAME TO "ProductCategory";
