FROM node:14.16.1

# workdir in virtualized docker env
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# start app
CMD [ "npm", "start" ]