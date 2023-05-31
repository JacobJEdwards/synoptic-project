-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_id_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
