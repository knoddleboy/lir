/*
  Warnings:

  - You are about to drop the column `nextId` on the `blocks` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `documents` table. All the data in the column will be lost.
  - Added the required column `metadata` to the `blocks` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `blocks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_nextId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_ownerId_fkey";

-- DropIndex
DROP INDEX "blocks_nextId_key";

-- DropIndex
DROP INDEX "documents_ownerId_title_idx";

-- AlterTable
ALTER TABLE "blocks" DROP COLUMN "nextId",
ADD COLUMN     "metadata" JSONB NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "ownerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "BlockType";

-- CreateIndex
CREATE INDEX "documents_userId_title_idx" ON "documents"("userId", "title");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
