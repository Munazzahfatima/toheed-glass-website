-- Catalog-only cleanup: drop orders, LED colors, shapes and checkout.
-- WARNING: this is destructive. Back up the database before running.

-- 1. Drop dependent tables first (FKs)
DROP TABLE IF EXISTS "ProductColor";
DROP TABLE IF EXISTS "Order";
DROP TABLE IF EXISTS "LedColor";
DROP TABLE IF EXISTS "DeliveryCityRate";

-- 2. Remove product columns tied to shapes / checkout
ALTER TABLE "Product" DROP COLUMN IF EXISTS "shapes";
ALTER TABLE "Product" DROP COLUMN IF EXISTS "hasCheckout";

-- 3. Remove order/delivery settings
ALTER TABLE "Settings" DROP COLUMN IF EXISTS "installationEnabled";
ALTER TABLE "Settings" DROP COLUMN IF EXISTS "installationCharge";
ALTER TABLE "Settings" DROP COLUMN IF EXISTS "freeDeliveryThreshold";
ALTER TABLE "Settings" DROP COLUMN IF EXISTS "defaultDeliveryCharge";
ALTER TABLE "Settings" DROP COLUMN IF EXISTS "estimatedProductionDays";
ALTER TABLE "Settings" DROP COLUMN IF EXISTS "estimatedDeliveryDays";

-- 4. Drop now-unused enums
DROP TYPE IF EXISTS "OrderStatus";
DROP TYPE IF EXISTS "ProductShape";
