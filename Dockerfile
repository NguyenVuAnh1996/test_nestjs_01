FROM node:20-alpine
WORKDIR /nestjs_app
COPY . .
RUN npm i -g @nestjs/cli
RUN npm i

EXPOSE 7401

CMD [ "npm", "run", "start:dev" ]