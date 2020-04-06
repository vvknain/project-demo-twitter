FROM node:13.10.1

WORKDIR /server

ENV PATH /server/node_modules/.bin:$PATH

COPY package.json /server/package.json

RUN npm install

COPY . .

CMD ["npm", "start"]