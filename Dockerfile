FROM node:alpine

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app
COPY ./server /app
RUN npm install
RUN npm install -g ts-node

EXPOSE 3001

CMD ["ts-node", "index.ts"]