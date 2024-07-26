/*
  Warnings:

  - Changed the type of `difficulty` on the `Problem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Difficulty";
