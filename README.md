# Freeform Portland Admin Application and API
[![CircleCI](https://circleci.com/gh/marciaga/kffp-admin.svg?style=svg)](https://circleci.com/gh/marciaga/kffp-admin)

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

Before starting the app for the first time, you'll need to build the main CSS file, which can be done with (this step need be done only the first time):
```
$ yarn build:css
```

Now you can run the app:
```
$ yarn dev
```
Note that the command `$ yarn dev` also runs the CSS watcher.

The app is available in your browser at `localhost:3000`.

### Alternative Local Environment Using Docker
First, install [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

Next, clone the repository
```
$ git clone git@github.com:marciaga/playlist-v2.git
```

You'll need to change your `.env` file to connect to the MongoDB container properly
`DB_CONNECTION=mongodb://db:27017`

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

## Git Workflow
We use Gitflow, which you can read about [here](https://www.atlassian.com/git/tutorials/comparing-workflows#gitflow-workflow)

Feature branches should be named as follows:
```
$ git checkout -b feature/my-feature
```

Pull requests should always be from your feature branch to the develop branch.

## DB Backup from Prod

You'll need the `.kffp_config` file.

Run mongo locally:
```
$ mongod
```

From the repo root, run
```
$ bash bin/local-backup.sh
```

## Public API Endpoints
get all shows
```
GET /api/v1/shows and /api/v1/shows/:id
Response: 200 SUCCESS
[
    {
        "_id": "6j323kljfsdlk23tksdf23234",
        "showName": "Bizarre Times",
        "users": [
            {
                "_id": "23234lksdf23lkjfsdfsdf2112",
                "displayName": "Judy Gloom"
            }
        ],
        "dayOfWeek": "Monday",
        "startTime": 18,
        "endTime": 20,
        "isActive": true,
        "slug": "bizarre-times",
        "description": "A great show for musics",
        "primaryImage": "https://freeformpdx-images.s3-us-west-2.amazonaws.com/16128970_10154932748291057_770461833_n.jpg"
    },
    {
    "_id": "234234234234jlsdfk23",
    "showName": "Turtles Have Short Legs",
    "users": [
        {
        "_id": "2342lk23409dfglkj28",
        "displayName": "Eeronomicon"
        },
        {
        "_id": "423kljs32340293023d",
        "displayName": "Gilliflower"
        }
    ],
    "dayOfWeek": "Sunday",
    "startTime": 21,
    "endTime": 17,
    "isActive": true,
    "slug": "turtles-have-short-legs"
    }
]

ERROR 503
{
    "statusCode": 503,
    "error": "Service Unavailable",
    "message": "unavailable"
}
```

get a playlist by show slug and optionally playlist ID.

Optional query param `order` e.g., `?order=asc`
```
GET /api/v1/playlists/{slug}/{playlistId?}
Response: 200 SUCCESS
{
    playlists: [
        {
            "_id": "232klj2342lk3j4kj4k",
            "showId": "3j32kdlkj23vsc312",
            "playlistDate": "2017-03-20T00:48:14.187Z",
            "playlistId":"S1U0Ushsl",
            "songs": [
                {
                    "artist": "This Mortal Coil",
                    "track": "Song To The Siren (Remastered)",
                    "album": "It'll End In Tears (Remastered)",
                    "label":"4AD",
                    "releaseDate":"1984",
                    "images":[
                        {
                            "height":640,
                            "url":"https://i.scdn.co/image/ff3f9101412755fe0f6f0ee0d95672a3cfc8d86b",
                            "width":640
                        },
                        {
                            "height":300,
                            "url":"https://i.scdn.co/image/32db10b5140656390329537e51e83a34a844c2cd",
                            "width":300
                        },
                        {
                            "height":64,
                            "url":"https://i.scdn.co/image/1b517635c80a09b50a59371d922e87eb60e9e1b2",
                            "width":64
                        }
                    ],
                    "id":"cj0k559bk0009w9p5ktkbg0wn"
                }
            ]
        }
    ],
    "show": {
        "_id": "2342309sdfkj230sdf",
        "showName": "Bizarre Times",
        "users": [
            "Judy Gloom"
        ],
        "dayOfWeek": "Monday",
        "startTime": 18,
        "endTime": 20,
        "isActive": true,
        "slug": "bizarre-times",
        "description": "A super cool show about stuff",
        "primaryImage": "https://freeformpdx-images.s3-us-west-2.amazonaws.com/16128970_10154932748291057_770461833_n.jpg"
    }
}

500 ERROR
{
    "statusCode": 500,
    "error": "Internal Server Error",
    "message": "An internal server error occurred"
}
```

TODO
get now playing
```
GET /api/v1/now-playing
Response 200 SUCCESS:
{
    "_id": "587da4dd29403e59645ed740",
    "artist": "Mirror Kisses",
    "track": "Genius",
    "album": "Heartbeats",
    "releaseDate": "2013-05-03",
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/9a7dc0f6aa01b9af941f4c4c5db5495c7bfa4a43",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://i.scdn.co/image/6774e8125e1f5eb64dbe9c3ca80635818b08b762",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/efab2abfd774657cee354e17c195be82855385d0",
            "width": 64
        }
    ],
    "playedAt": "2017-03-19T01:09:47.645Z",
    "songId": "cj0fwd4hp000079p5njg3h6xb"
}

Response 200 SUCCESS:
{
    "success": "false",
    "message": "Nothing is playing"
}

Response 503 ERROR:
{
    "statusCode": 503,
    "error": "Service Unavailable",
    "message": "unavailable"
}
```
