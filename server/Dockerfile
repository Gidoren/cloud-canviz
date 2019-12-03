FROM node:latest

RUN mkdir -p /srv/app/admin-server
WORKDIR /srv/app/admin-server

COPY package.json /srv/app/admin-server
#COPY package-lock.json /srv/app/admin-server

RUN npm install

COPY . /srv/app/admin-server

EXPOSE 8080

CMD ["npm", "start"]
