# ---- Build Stage ----
    FROM node:18 AS builder

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    
    # ---- Production Stage ----
    FROM node:18-slim
    
    WORKDIR /app

    COPY package*.json ./
    RUN npm install --only=production
    
    COPY --from=builder /app/dist ./dist
    
    EXPOSE 3000
    
    CMD ["node", "dist/main"]