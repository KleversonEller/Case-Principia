# imagem para desenvolvimento
FROM node:20-alpine

WORKDIR /app

# copia package.json primeiro para usar cache
COPY package*.json ./

RUN npm install

# copia todo o código (em dev, o código será sobrescrito pelo volume do compose)
COPY . .

EXPOSE 5173

# seta variáveis úteis para file watching em volumes (opcional)
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=100

CMD ["npm", "run", "dev", "--", "--host"]
