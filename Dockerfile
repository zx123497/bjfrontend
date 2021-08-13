FROM node:12 as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8000

CMD ["npm", "start"]