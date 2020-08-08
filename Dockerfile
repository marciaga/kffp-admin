FROM node:12
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app
# Installing dependencies
COPY package*.json ./
RUN npm install
# Copying source files
COPY . .
# Building app
RUN npm run build:production
EXPOSE 8080
ENV NODE_ENV=production
# Running the app
CMD [ "npm", "start" ]