FROM node

WORKDIR /app

COPY ["src", "package.json", "tsconfig.json", "./"]

RUN yarn install

RUN yarn run build

EXPOSE 4000
CMD [ "yarn", "serve" ]