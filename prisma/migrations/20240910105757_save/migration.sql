/*
  Warnings:

  - You are about to drop the column `lessonType` on the `Lessons` table. All the data in the column will be lost.
  - Added the required column `lessonTypeId` to the `Lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lessons" DROP COLUMN "lessonType",
ADD COLUMN     "lessonTypeId" TEXT NOT NULL,
ALTER COLUMN "videoLink" DROP NOT NULL,
ALTER COLUMN "img" DROP NOT NULL;

-- CreateTable
CREATE TABLE "LessonType" (
    "id" TEXT NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "LessonType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonType_typeName_key" ON "LessonType"("typeName");

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_lessonTypeId_fkey" FOREIGN KEY ("lessonTypeId") REFERENCES "LessonType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
