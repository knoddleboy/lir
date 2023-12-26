-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('title', 'heading1', 'heading2', 'text');

-- CreateTable
CREATE TABLE "blocks" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "type" "BlockType" NOT NULL,
    "content" JSONB NOT NULL,
    "nextId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blocks_nextId_key" ON "blocks"("nextId");

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_nextId_fkey" FOREIGN KEY ("nextId") REFERENCES "blocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
