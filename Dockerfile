FROM node:lts-alpine

COPY . /app

WORKDIR /app

RUN yarn

RUN yarn workspace @exscientia/ui build

CMD yarn workspace @exscientia/ui start