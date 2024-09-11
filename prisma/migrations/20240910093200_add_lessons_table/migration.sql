-- CreateTable
CREATE TABLE "Lessons" (
    "lessonId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lessonType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "videoLink" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lessons_pkey" PRIMARY KEY ("lessonId")
);
