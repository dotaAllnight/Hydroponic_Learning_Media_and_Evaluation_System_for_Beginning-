/*
  Warnings:

  - A unique constraint covering the columns `[roleName]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "HistoryLesson" (
    "id" TEXT NOT NULL,
    "learnDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "HistoryLesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_lesson_idx" ON "HistoryLesson"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_roleName_key" ON "Role"("roleName");

-- AddForeignKey
ALTER TABLE "HistoryLesson" ADD CONSTRAINT "HistoryLesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryLesson" ADD CONSTRAINT "HistoryLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lessons"("lessonId") ON DELETE CASCADE ON UPDATE CASCADE;
