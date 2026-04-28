# Deployment Design: Dockerized Next.js & Express Stack

This document outlines the design for deploying the fhzb-1400 project to a production server using Docker Compose and Nginx.

## 1. Objectives
- Containerize the Next.js frontend and Express backend.
- Use Nginx as a reverse proxy to handle routing and SSL (optional).
- Ensure data persistence for the SQLite database and uploaded media.
- Simplify deployment with a single command.

## 2. Architecture
The system consists of three main services running in a Docker network:

### A. Frontend (app)
- **Framework**: Next.js 16 (Standalone mode)
- **Port**: 3000 (Internal)
- **Role**: Serves the website and admin dashboard.

### B. Backend (server)
- **Framework**: Express.js
- **Database**: SQLite
- **Port**: 3001 (Internal)
- **Role**: Handles API requests, database operations, and file uploads.

### C. Reverse Proxy (gateway)
- **Image**: `nginx:stable-alpine`
- **Port**: 80 (External)
- **Role**: Routes traffic based on URL patterns:
    - `/api/*` -> `server:3001`
    - `/uploads/*` -> `server:3001` (or served directly)
    - `/*` -> `app:3000`

## 3. Data Persistence
Two Docker volumes will be used:
1. `sqlite_data`: Persistent storage for the SQLite database file (`server/database.sqlite`).
2. `uploads_data`: Persistent storage for media files (`public/uploads`).

## 4. Implementation Details

### API Connectivity
The current hardcoded `http://localhost:3001/api` in `src/lib/api.ts` will be changed to relative path `/api`. This allows the browser to hit the Nginx gateway, which then forwards to the backend container.

### Docker Configuration
- **Root Dockerfile**: Already exists for Next.js standalone.
- **Server Dockerfile**: To be created in `./server/Dockerfile`.
- **Nginx Configuration**: To be created in `./nginx/default.conf`.
- **Docker Compose**: Root `docker-compose.yml` will be updated to include all three services and volumes.

## 5. Deployment Steps
1. Prepare the server (Install Docker, Docker Compose).
2. Create production `.env` files.
3. Transfer code to the server.
4. Run `docker-compose up -d --build`.

## 6. Success Criteria
- Website is accessible at `http://1.13.254.94`.
- Admin panel functions correctly (login, content updates).
- Uploaded images are served correctly and persist across container restarts.
