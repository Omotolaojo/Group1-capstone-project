# Stage 1: Build & Compile
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy package management files
COPY package*.json tsconfig.json ./

# Install all dependencies (including devDependencies needed for TypeScript)
RUN npm ci

# Copy source code and configurations
COPY . .

# Compile TypeScript to JavaScript (typically outputs to a /dist or /build folder)
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy package files to install production-only dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled JavaScript from the builder stage
# (Adjust "dist" if your tsconfig.json outDir points elsewhere, e.g., "build")
COPY --from=builder /usr/src/app/dist ./dist

# Run as a non-root user for security
USER node

# Expose your backend port (change 5000 to whatever your server.ts listens on)
EXPOSE 5000

ENV PORT=5000

CMD ["node", "dist/server.js"]
