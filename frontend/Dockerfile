FROM node:22.11.0-alpine

WORKDIR /app

COPY ./package.json ./
RUN npm install


COPY ./build/ .

ENV NODE_ENV=production

EXPOSE 3000

# CMD ["npm", "run", "start"]