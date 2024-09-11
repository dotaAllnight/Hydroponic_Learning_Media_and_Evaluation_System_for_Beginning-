/*
  Warnings:

  - Added the required column `lessonref` to the `Lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lessons" ADD COLUMN     "lessonref" TEXT NOT NULL;
