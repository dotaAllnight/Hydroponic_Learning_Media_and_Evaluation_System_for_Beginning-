-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "learnDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);
