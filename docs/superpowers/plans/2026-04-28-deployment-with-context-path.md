# Deployment with Context Path (/fhzb) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the project to the server with `basePath: /fhzb` using Docker Compose and Nginx.

**Architecture:** Nginx acts as a gateway on port 80, routing `/fhzb/api` to the Express backend and all other `/fhzb` traffic to the Next.js standalone server.

**Tech Stack:** Docker, Docker Compose, Nginx, Next.js, Express, SQLite.

---

### Task 1: Frontend Code Adjustments

**Files:**
- Modify: `next.config.ts`
- Modify: `src/lib/api.ts`

- [ ] **Step 1: Change Next.js output to standalone**
Next.js standalone mode is better for dynamic App Router apps.
```typescript
// next.config.ts
const nextConfig = {
  output: 'standalone', // Change from 'export' to 'standalone'
  basePath: '/fhzb',
  images: {
    unoptimized: true,
  },
};
```

- [ ] **Step 2: Update API Base URL to use Context Path**
```typescript
// src/lib/api.ts:1
const API_BASE_URL = '/fhzb/api'; // Change from 'http://localhost:3001/api'
```

- [ ] **Step 3: Commit changes**
```bash
git add next.config.ts src/lib/api.ts
git commit -m "chore: setup standalone output and relative api path with /fhzb"
```

### Task 2: Backend Containerization

**Files:**
- Create: `server/Dockerfile`

- [ ] **Step 1: Create server Dockerfile**
```dockerfile
FROM node:24-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]
```

- [ ] **Step 2: Commit backend Dockerfile**
```bash
git add server/Dockerfile
git commit -m "feat: add backend Dockerfile"
```

### Task 3: Nginx Gateway Configuration

**Files:**
- Create: `nginx/default.conf`
- Create: `nginx/Dockerfile`

- [ ] **Step 1: Create Nginx config**
```nginx
server {
    listen 80;
    server_name localhost;

    # Backend API and Uploads
    location /fhzb/api/ {
        proxy_pass http://backend:3001/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /fhzb/uploads/ {
        proxy_pass http://backend:3001/uploads/;
        proxy_set_header Host $host;
    }

    # Frontend
    location /fhzb/ {
        proxy_pass http://app:3000/fhzb/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Redirect root to /fhzb
    location = / {
        return 301 /fhzb/;
    }
}
```

- [ ] **Step 2: Create Nginx Dockerfile**
```dockerfile
FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
```

- [ ] **Step 3: Commit Nginx config**
```bash
git add nginx/
git commit -m "feat: add nginx gateway configuration"
```

### Task 4: Docker Compose Orchestration

**Files:**
- Modify: `docker-compose.yml`

- [ ] **Step 1: Update docker-compose.yml**
```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: runner
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0

  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
    restart: unless-stopped
    volumes:
      - sqlite_data:/app/database.sqlite
      - uploads_data:/app/public/uploads
    environment:
      - NODE_ENV=production
      - PORT=3001

  gateway:
    build:
      context: ./nginx
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - app
      - backend
    restart: unless-stopped

volumes:
  sqlite_data:
  uploads_data:
```

- [ ] **Step 2: Commit orchestration**
```bash
git add docker-compose.yml
git commit -m "feat: complete multi-service docker-compose orchestration"
```

### Task 5: Server Deployment

- [ ] **Step 1: Test build locally**
Run `docker-compose build` to ensure everything compiles.

- [ ] **Step 2: Prepare Server Environment**
Connect via SSH and ensure Docker/Docker Compose are installed.
```bash
ssh root@1.13.254.94
# Install docker if missing
```

- [ ] **Step 3: Transfer and Deploy**
Transfer code and run `docker-compose up -d`.
