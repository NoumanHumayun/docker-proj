FROM node:16-alpine3.11 as nodejs

WORKDIR /
COPY . /
ADD ./package.json /app/package.json
RUN rm -rf package-lock.json
RUN yarn install 

CMD ["npm", "start"]