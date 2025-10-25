# backend/Dockerfile

# Etapa 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia apenas arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia todo o código e gera o build
COPY . .
RUN npm run build

# Etapa 2: runtime
FROM node:20-alpine
WORKDIR /app

# Copia apenas o necessário do build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Dá permissão total (leitura, escrita e execução) para tudo em /app
RUN chmod -R 777 /app

EXPOSE 3000

CMD ["node", "dist/main.js"]
