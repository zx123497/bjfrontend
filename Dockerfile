FROM node:12 as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


EXPOSE 443

CMD ["npm", "start"]