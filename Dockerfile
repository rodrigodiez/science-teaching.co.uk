FROM node:5.10

RUN mkdir /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g grunt-cli
RUN npm install
RUN grunt build

RUN mkdir -p /usr/share/nginx/html
RUN cp -R dist/* /usr/share/nginx/html

VOLUME /usr/share/nginx/html
