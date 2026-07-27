# Stage 1: Build & Compile
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

# Copy prisma files
COPY prisma ./prisma
# COPY prisma.config.ts ./

# Run migrations BEFORE starting server
RUN npx prisma generate

# compilr typescript
RUN npm run build

# Remove dev dependencies
RUN npm prune --omoit=dev

# Stage 2: Production Runtime
FROM node:20-alpine 
WORKDIR /app

# create a non root user 
RUN addgroup --system appgroup && \
    adduser --system appuser -G appgroup

ENV NODE_ENV=production

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Copy compiled app
COPY --from=builder /app/dist ./dist

# Copy Prisma schema + migrations
COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/prisma.config.ts ./

# set ownership
RUN chown -R appuser:appgroup /app

# switch to non root user
USER appuser

# Generate Prisma client (VERY IMPORTANT)
RUN npx prisma generate

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/v1/health || exit 1
# CMD ["./docker-entrypoint.sh"]
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]


