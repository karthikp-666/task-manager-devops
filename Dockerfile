# FROM node:24-alpine

# WORKDIR /app

# COPY backend/package*.json ./backend/

# RUN cd backend && npm install

# COPY backend ./backend

# COPY frontend ./frontend

# EXPOSE 3000

# CMD ["node", "backend/server.js"]

FROM node:24-alpine

WORKDIR /app

COPY backend/package*.json ./backend/

RUN cd backend && npm ci --omit=dev

COPY backend ./backend
COPY frontend ./frontend

ENV NODE_ENV=production
ENV PORT=3000
ENV APP_VERSION=1.0.0

EXPOSE 3000

CMD ["node", "backend/server.js"]