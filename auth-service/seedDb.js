// Test user seed file
// This file can be used to create test users for development

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing test users (optional, comment out if you want to keep data)
    // await prisma.user.deleteMany();

    // Create test users
    const testUsers = [
      {
        email: "customer@test.com",
        name: "Test Customer",
        password: await bcrypt.hash("password123", 10),
        role: "customer",
      },
      {
        email: "admin@test.com",
        name: "Test Admin",
        password: await bcrypt.hash("password123", 10),
        role: "superadmin",
      },
      {
        email: "chef@test.com",
        name: "Test Chef",
        password: await bcrypt.hash("password123", 10),
        role: "chef",
      },
    ];

    for (const user of testUsers) {
      const existing = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existing) {
        const created = await prisma.user.create({ data: user });
        console.log(`✅ Created user: ${created.email} (ID: ${created.id})`);
      } else {
        console.log(`⏭️  User already exists: ${user.email}`);
      }
    }

    console.log("\n✅ Database seeding completed!");
    console.log("\nTest Credentials:");
    console.log("- Email: customer@test.com | Password: password123 | Role: customer");
    console.log("- Email: admin@test.com | Password: password123 | Role: superadmin");
    console.log("- Email: chef@test.com | Password: password123 | Role: chef");
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
