FROM node:18.6

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3011

 CMD [ "npm", "run dev" ]