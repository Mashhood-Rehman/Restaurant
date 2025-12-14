import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  
  // ✅ New in v7: Define datasources here
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});