FROM node

WORKDIR /app

COPY ["src", "package.json", "tsconfig.json", "./"]

RUN yarn install

EXPOSE 4000
CMD [ "ls", "-R" ]