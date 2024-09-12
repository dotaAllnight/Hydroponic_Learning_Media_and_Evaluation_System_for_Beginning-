/*
  Warnings:

  - You are about to drop the `Members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_roleId_fkey";

-- DropTable
DROP TABLE "Members";

-- DropTable
DROP TABLE "UserRole";
