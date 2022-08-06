# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```



## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

## How to run app
1. Install docker
2. go to root directory of the project
3. ```docker-compose up```

Alternative solution: pull images from dockerhub. 
https://hub.docker.com/repository/docker/chessdude1/nodejs2022q2-service_app

## Pgadmin
  Project have postgres admin panel

1. Go to localhost:5050 (by default)
2. email: admin@admin.com, password: admin
3. create new server with any name, hostname: nodejs2022q2-service_db_1, username: postgres, password : postgres



To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
