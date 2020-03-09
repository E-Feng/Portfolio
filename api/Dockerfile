FROM node:12-alpine

# Directory for app in container and installation
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]