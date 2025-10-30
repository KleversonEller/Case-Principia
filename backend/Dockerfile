# backend/Dockerfile

# Etapa 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# Instala cliente do Postgres (psql)
RUN apk add --no-cache postgresql-client

# Copia arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia todo o código-fonte
COPY . .

# Gera o Prisma Client antes de compilar
RUN npx prisma generate

# Gera o build
RUN npm run build

# Etapa 2: runtime
FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main.js"]
