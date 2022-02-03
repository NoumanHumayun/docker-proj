FROM node:16-alpine3.11

WORKDIR /

COPY . /

ADD ./package.json /app/package.json

RUN rm -rf node_modules 
RUN yarn install 

CMD ["yarn", "start"]