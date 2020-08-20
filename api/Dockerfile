FROM node:12-alpine

# Directory for app in container and installation
WORKDIR /api
COPY package*.json ./
RUN npm install 

COPY . .
ENV NODE_ENV=production
EXPOSE 5000