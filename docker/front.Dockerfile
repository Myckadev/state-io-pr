FROM node:20

WORKDIR /app

COPY front/package.json front/package-lock.json ./
RUN npm install

COPY front/ .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
