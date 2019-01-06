FROM node:alpine as builder
RUN apk update && apk add --no-cache make git

WORKDIR /app
ADD package*.json /app/
RUN cd /app && set progress=false && npm install

COPY . /app

RUN cd /app && npm run test && npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

