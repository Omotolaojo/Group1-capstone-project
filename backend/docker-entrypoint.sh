#!/bin/sh

set -e

echo "Running Prisma migrations..."

npx prisma migrate deploy

echo "Prisma migrations completed successfully."

echo "Creating admin user..."

node dist-seed/create_admin.js

echo "Admin user setup completed successfully."

echo "Starting Expense API..."

node dist/server.js