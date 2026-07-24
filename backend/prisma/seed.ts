import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Optional: clear existing claims first
  await prisma.claim.deleteMany();

  await prisma.claim.createMany({
    data: [
      {
        vendor: "Shoprite",
        amount: 45000,
        date: new Date("2026-07-01"),
        status: "pending",
        receiptUrl: null,
        extracted: {
          merchant: "Shoprite",
          total: 45000,
          date: "2026-07-01",
        },
      },
      {
        vendor: "Amazon",
        amount: 125000,
        date: new Date("2026-07-02"),
        status: "approved",
        receiptUrl: null,
        extracted: {
          merchant: "Amazon",
          total: 125000,
          date: "2026-07-02",
        },
      },
      {
        vendor: "Uber",
        amount: 18500,
        date: new Date("2026-07-03"),
        status: "rejected",
        receiptUrl: null,
        extracted: {
          merchant: "Uber",
          total: 18500,
          date: "2026-07-03",
        },
      },
      {
        vendor: "Jumia",
        amount: 75000,
        date: new Date("2026-07-04"),
        status: "pending",
        receiptUrl: null,
        extracted: {
          merchant: "Jumia",
          total: 75000,
          date: "2026-07-04",
        },
      },
      {
        vendor: "Microsoft",
        amount: 250000,
        date: new Date("2026-07-05"),
        status: "approved",
        receiptUrl: null,
        extracted: {
          merchant: "Microsoft",
          total: 250000,
          date: "2026-07-05",
        },
      },
      {
        vendor: "Bolt",
        amount: 22000,
        date: new Date("2026-07-06"),
        status: "pending",
        receiptUrl: null,
        extracted: {
          merchant: "Bolt",
          total: 22000,
          date: "2026-07-06",
        },
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });