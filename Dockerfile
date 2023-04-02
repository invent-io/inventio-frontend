FROM node:16
EXPOSE 3000

COPY . .
RUN yarn
RUN npm install -g serve
RUN yarn build:prod
CMD yarn start:prod