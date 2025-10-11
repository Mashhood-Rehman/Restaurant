# Use Bun image
FROM oven/bun:alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json ./
COPY bun.lock* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start the service
CMD ["bun", "run", "server.js"]