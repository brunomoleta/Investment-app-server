-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "is_super" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "advisors" ADD COLUMN     "is_super" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "investors" ADD COLUMN     "is_super" BOOLEAN NOT NULL DEFAULT false;
