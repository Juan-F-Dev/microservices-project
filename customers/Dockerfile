FROM node:18-alpine

WORKDIR /app

# Copiamos las dependencias primero para aprovechar el caché de Docker
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
