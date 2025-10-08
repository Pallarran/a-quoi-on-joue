# Build stage for client
FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install server dependencies (including tsx for runtime)
COPY server/package*.json ./
RUN npm ci

# Copy server files
COPY server/ ./

# Copy built client files
COPY --from=client-builder /app/client/dist ./client/dist

# Create necessary directories
RUN mkdir -p uploads data public/images

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start server
CMD ["npm", "start"]
