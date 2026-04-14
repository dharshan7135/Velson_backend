# ── Stage: production ─────────────────────────────────────────────
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (layer cache)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Make entrypoint executable
RUN chmod +x entrypoint.sh

# Expose the API port
EXPOSE 5000

# Auto-seed on first start, then run server
ENTRYPOINT ["sh", "entrypoint.sh"]
