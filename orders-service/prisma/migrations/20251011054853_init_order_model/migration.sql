-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "items" TEXT[],
    "amount" INTEGER NOT NULL,
    "address" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
