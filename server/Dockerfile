FROM node:24-slim

WORKDIR /app

# Use domestic mirror for apt
RUN sed -i 's/deb.debian.org/mirrors.tencentyun.com/g' /etc/apt/sources.list.d/debian.sources 2>/dev/null || sed -i 's/deb.debian.org/mirrors.tencentyun.com/g' /etc/apt/sources.list

# Install build dependencies for better-sqlite3
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the code
COPY . .

# Ensure the public/uploads directory exists if needed (it will be a volume anyway)
RUN mkdir -p ../public/uploads

# Create data and uploads directories
RUN mkdir -p data uploads

EXPOSE 3001

CMD ["node", "index.js"]
