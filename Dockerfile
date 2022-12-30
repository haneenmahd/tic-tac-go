FROM node:18
ENV NODE_ENV "production"

WORKDIR /backend

COPY ["package.json", "tsconfig.json", "./"]

RUN yarn install
RUN yarn run build

COPY . .

CMD [ "node", "dist/server.js" ]