FROM node

WORKDIR /app

COPY ["package.json", "tsconfig.json", "./"]

COPY src /app/src

RUN yarn install

EXPOSE 4000
CMD [ "yarn", "serve" ]