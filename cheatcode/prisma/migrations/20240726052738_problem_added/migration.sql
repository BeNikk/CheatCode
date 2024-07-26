-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "testCases" JSONB NOT NULL,
    "language" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Problem_id_key" ON "Problem"("id");
