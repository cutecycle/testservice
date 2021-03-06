# Create app directory
FROM node:slim
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
CMD ["npm", "run", "test"]