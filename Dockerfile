FROM node:17.0.1-alpine3.13 AS builder

WORKDIR /app
COPY . ./

RUN npm install
RUN npm run build

FROM nginx:1.20.1-alpine

EXPOSE 80

COPY --from=builder /app/dist /usr/share/nginx/html