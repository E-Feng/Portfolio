FROM node:15.5.1-alpine3.11

# Directory for app in container and installation
WORKDIR /api
COPY package*.json ./
RUN npm install 

COPY . .
ENV NODE_ENV=production
EXPOSE 5000