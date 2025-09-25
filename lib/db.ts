import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
    datasources: {
      db: {
        url: process.env.POSTGRES_URL_NON_POOLING,
      },
    },
    errorFormat: "pretty",
    transactionOptions: {
      timeout: 10000, // 10 seconds
      maxWait: 5000,  // 5 seconds
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Add connection retry logic
export const connectWithRetry = async (retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await db.$connect();
      console.log("Database connected successfully");
      return;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Graceful shutdown
process.on('beforeExit', async () => {
  await db.$disconnect();
});
