/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'DESTROYED', 'DEPLOYED', 'DECOMMISSIONED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Gadget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Gadget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gadget" ADD CONSTRAINT "Gadget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
