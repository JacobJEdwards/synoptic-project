/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "halal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kosher" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "origin" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "vegan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vegetarian" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Charity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,

    CONSTRAINT "Charity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
