# backend/Dockerfile

# Etapa 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# Instala cliente do Postgres (psql)
RUN apk add --no-cache postgresql-client

# Copia arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia todo o código e gera o build
COPY . .
RUN npm run build

# Etapa 2: runtime
FROM node:20-alpine
WORKDIR /app

# Instala o cliente do Postgres também no runtime
# (necessário se você usa comandos psql no startup)
RUN apk add --no-cache postgresql-client

# Copia apenas o necessário do build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
