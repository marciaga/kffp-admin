FROM node:6.9.1

# Install the latest version of Yarn

RUN apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn && apt-get clean

# Create app directory

RUN mkdir -p /opt/app

# Set working directory

WORKDIR /opt/app

# Copy depenency management files

COPY package.json yarn.lock /opt/app/

# Install dependencies

RUN yarn

# Copy app source code

COPY . /opt/app
