FROM node:14.17-slim

ENV DEPLOY api

COPY apps/ /usr/aplication/apps
COPY package.json tsconfig.json .npmrc .env .env.local .env.test .env.uat ormconfig.js nest-cli.json .eslintrc.js .prettierrc tsconfig.build.json /usr/aplication/
WORKDIR /usr/aplication

RUN npm install
RUN npm run build
RUN npm run build:consumer
CMD ["sh", "-c", "node dist/apps/${DEPLOY}/main.js"]