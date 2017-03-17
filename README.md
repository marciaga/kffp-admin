[![Build Status](https://semaphoreci.com/api/v1/freeformportland/kffp-admin/branches/master/badge.svg)](https://semaphoreci.com/freeformportland/kffp-admin)

# Freeform Portland Admin Application and API

### Set Up Local Development Environment on OSX:

Clone the repository
```
$ git clone git@github.com:marciaga/playlist-v2.git
```
(If you're on a Mac, we recommend installing [Homebrew](http://brew.sh/).

Ensure you have a compatible version of Node and NPM:
```
$ node -v
$ npm -v
```
We use Node `6.9.1` and NPM `3.10.9` and recommend globally installing [n](https://github.com/tj/n) to manage your Node versions.

Next, install [Yarn](https://yarnpkg.com/) which we use for managing dependencies. If you're on a Mac you can use `Homebrew`:
```
$ brew install yarn
```

or `npm`:

```
$ npm i yarn -g
```
or just install the binary!

```
$ curl -o- -L https://yarnpkg.com/install.sh | bash
```

Now, install the dependencies with:
```
$ yarn
```

Next, you'll need a running instance of `MongoDB` version `>=3.2`. To install, we recommend using `Homebrew`:
```
$ brew install mongodb
```

Run the `MongoDB` server:
```
$ mongod
```
We advise leaving the terminal window open while the server is running. When you want to stop the server, use: `Ctrl + c`.

Before continuing, you'll need to obtain a data dump from another developer on the project. We use the native `MongoDB` archive format, so the file will be `admindump.archive`. To import it, first, be sure the `mongod` server is running. Then, from the directory in which the archive file is, run
```
$ mongorestore --gzip --archive=admindump.archive
```

You'll also need a `.env` file, whose values you can obtain from another developer on the project. An example `.env.example` is in the project directory, so you can
```
$ cp .env.example .env
```
then fill in the values.

Now you can run the app:
```
$ yarn dev
```

The app is available in your browser at `localhost:3000`.

You'll also, at first, want to build the CSS files, which can be done with:
```
$ yarn build:css
```

If you're doing a lot of styling, you can run the watcher which will rebuild the CSS whenever you change a `.scss` file:
```
$ yarn watch:css
```

Note that the command `$ yarn dev` also runs the CSS watcher.

### Alternative (recommended) Local Environment
First, install [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

Next, clone the repository
```
$ git clone git@github.com:marciaga/playlist-v2.git
```

> env vars

> mongo connection: 'mongodb://localhost:27017/playlist-dev'


Next, run:
```
$ docker-compose up -d --build
```
This command will build the images, install the dependencies, and start the application in development mode. The application will be accessible at `http://localhost:3000`


## Tests
We use the `Jest` testing framework.
To run the tests, use:
```
$ yarn test
```

## Code Style
We use ESLint to ensure style consistency:
```
$ yarn lint
```

## Adding New Dependencies
It's important to not use `npm` to add dependencies because they won't be added to the `yarn.lock` file. Instead, to add to `dependencies` use
```
$ yarn add <package>
```
or to add to `devDependencies`, use
```
$ yarn add -D <package>
```


### Coming soon:
* CI integration
* Production and Staging builds
