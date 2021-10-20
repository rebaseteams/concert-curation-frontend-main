# STAGE 1
FROM node:16-alpine as build-step
WORKDIR /usr/src/app
COPY ["package.json","./"]
RUN npm install
COPY . .
RUN npm run build
# STAGE 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /usr/src/app/build /usr/share/nginx/html