-- CreateEnum
CREATE TYPE "Category" AS ENUM ('BARBEARIA', 'MANICURE', 'CYBER');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "categoria" "Category" DEFAULT 'BARBEARIA';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "categoria" "Category" DEFAULT 'BARBEARIA';
