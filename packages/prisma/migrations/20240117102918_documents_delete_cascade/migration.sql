-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_userId_fkey";

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
