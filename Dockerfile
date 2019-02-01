FROM node:alpine as builder
RUN apk update && apk add --no-cache make git

WORKDIR /app
COPY package*.json ./
RUN set progress=false && npm install

COPY . ./

RUN npm run test && npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*

COPY server.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

