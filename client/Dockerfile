FROM node:latest

RUN mkdir -p /srv/app/client-admin
WORKDIR /srv/app/client-admin

COPY package.json /srv/app/client-admin
#COPY package-lock.json /srv/app/client-admin

RUN npm install

COPY . /srv/app/client-admin

EXPOSE 8081

CMD ["npm", "start"]
