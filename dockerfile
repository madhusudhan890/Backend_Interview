FROM node:alpine

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install -D nodemon jest supertest


CMD [ "node", "server.js" ]