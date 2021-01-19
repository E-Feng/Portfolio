FROM node:15.5.1-alpine3.11 AS builder

# Creating build in initial container
WORKDIR /usr/src/app/client
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build

# Moving over to 2nd container
FROM nginx:1.19.6-alpine
COPY --from=builder /usr/src/app/client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]