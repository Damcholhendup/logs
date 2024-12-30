-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "ticketNumber" TEXT NOT NULL,
    "errorCode" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceInfo" TEXT NOT NULL,
    "errorTitle" TEXT NOT NULL,
    "userDescription" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
