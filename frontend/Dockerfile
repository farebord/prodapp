FROM node:latest
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3000 3010
CMD ["yarn", "dev"]