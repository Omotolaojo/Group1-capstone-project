# --- STAGE 1: Build the TypeScript code ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install ALL dependencies (including devDependencies for TS)
COPY package*.json ./
RUN npm ci

# Copy the rest of your backend source code
COPY . .

# Compile TypeScript to JavaScript (assumes you have a "build" script in package.json)
RUN npm run build

# --- STAGE 2: Run the compiled JavaScript ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Only install production dependencies to keep the image slim
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled code from the builder stage (usually goes to a 'dist' or 'build' folder)
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]
