/*
  Warnings:

  - You are about to drop the `blocks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_documentId_fkey";

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "content" JSONB NOT NULL;

-- DropTable
DROP TABLE "blocks";
