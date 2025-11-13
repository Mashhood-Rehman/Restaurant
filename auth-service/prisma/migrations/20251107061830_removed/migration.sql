/*
  Fixed migration – prevents enum drop errors
*/

-- AlterEnum
BEGIN;

CREATE TYPE "Role_new" AS ENUM ('superadmin', 'manager', 'customer', 'chef', 'rider');

ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");

ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";

ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'customer';

COMMIT;

-- ✅ DROP AFTER TRANSACTION (safe)
DROP TYPE IF EXISTS "Role_old";
