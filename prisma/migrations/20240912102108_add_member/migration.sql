-- CreateTable
CREATE TABLE "Members" (
    "memberId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "memberName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "roleId" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_email_key" ON "Members"("email");

-- CreateIndex
CREATE INDEX "Members_email_idx" ON "Members"("email");

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRole"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;
