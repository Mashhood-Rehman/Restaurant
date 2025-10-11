# Use Bun image
FROM oven/bun:alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json ./
COPY bun.lock* ./

# Install dependencies
RUN bun install

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN bunx prisma generate

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Start the service
CMD ["bun", "run", "server.js"]