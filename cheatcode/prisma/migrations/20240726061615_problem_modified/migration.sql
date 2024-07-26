/*
  Warnings:

  - The `id` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Problem_id_key";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Problem_pkey" PRIMARY KEY ("id");
