#!/bin/sh
# entrypoint.sh — runs seed then starts the API server
set -e

echo "⏳ Running database seed (safe — skips if already seeded)..."
node seeds/seedData.js

echo "🚀 Starting VELSON Industries API..."
exec node server.js
