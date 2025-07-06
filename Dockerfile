# Build stage
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install with legacy peer deps to handle version conflicts
RUN rm -rf node_modules package-lock.json
RUN npm install --legacy-peer-deps

# Force install correct esbuild version
RUN npm uninstall esbuild
RUN npm install esbuild@0.21.5 --save-dev --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

