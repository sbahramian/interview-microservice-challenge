# First Stage : to install and build dependences
FROM node:16.17-alpine AS builder
WORKDIR /app

ARG NPM_TOKEN  
COPY ./.npmrc.sample ./.npmrc
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm i --legacy-peer-deps
RUN rm -f ./.npmrc
COPY . .
RUN npx prisma generate
RUN npm run build

# Second Stage : Setup command to run your app using lightweight node image
FROM node:16.17-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN chown node:node -R /app
USER node
EXPOSE 8080
CMD ["node", "dist/main.js"]
