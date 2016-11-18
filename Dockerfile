FROM node:6.9.1

# Install Yarn
RUN apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn=0.16.1-1 && apt-get clean

WORKDIR /app

# install dependencies
COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn install --pure-lockfile

RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# Copy the application code
ADD . /app

EXPOSE 3000
CMD ["yarn", "run", "dev"]
