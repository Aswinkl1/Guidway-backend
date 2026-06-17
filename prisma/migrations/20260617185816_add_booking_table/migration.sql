-- CreateTable
CREATE TABLE "booking_intents" (
    "slotId" TEXT NOT NULL,
    "note" TEXT,
    "sessionId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currensy" TEXT NOT NULL,
    "gatewayOrderId" TEXT,
    "paymentProvider" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_intents_pkey" PRIMARY KEY ("slotId")
);

-- AddForeignKey
ALTER TABLE "booking_intents" ADD CONSTRAINT "booking_intents_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_intents" ADD CONSTRAINT "booking_intents_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
