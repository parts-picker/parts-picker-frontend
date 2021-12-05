FROM node:16.13.1-alpine

# workdir in virtualized docker env
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# start app
CMD [ "npm", "start" ]