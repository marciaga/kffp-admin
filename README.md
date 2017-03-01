[![Build Status](https://semaphoreci.com/api/v1/freeformportland/kffp-admin/branches/master/badge.svg)](https://semaphoreci.com/freeformportland/kffp-admin)

# Freeform Portland Admin Application and API

### Set Up Local Development Environment:

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

Next, install [Yarn](https://yarnpkg.com/) which we use form managing dependencies. If you're on a Mac you can use `Homebrew`, but we recommend using `npm` to globally install `yarn`:
```
$ npm i yarn -g
```

Now, install the dependencies with:
```
$ yarn install
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

Now you can run the app:
```
$ yarn run dev
```

The app is available in your browser at `localhost:3000`.

## Tests
We use the `Jest` testing framework.
To run the tests, use:
```
$ yarn run test
```

## Code Style
We use ESLint to ensure style consistency:
```
$ yarn run lint
```

### Coming soon:
* optional local dev environment with Docker
* CI integration
* Production and Staging builds
