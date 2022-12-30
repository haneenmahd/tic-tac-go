FROM node
ENV NODE_ENV "production"

WORKDIR /app

COPY ["package.json", "tsconfig.json"] /

COPY . .

RUN yarn install

RUN yarn run build

EXPOSE 4000
CMD [ "yarn", "serve" ]