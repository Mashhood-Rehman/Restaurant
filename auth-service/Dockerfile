FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY bun.lock* ./


RUN npm install

COPY prisma  ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD [ "node", "server.json" ]