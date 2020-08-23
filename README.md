# Marlos website

A website and tools used to organize D&D encounters.


## Current setup

- Keycloak 6.0.1
- Spring boot REST backend
- Node serving Vue frontend
- nginx for reverse proxy

## Running

Configuration via environment variables:
- MYSQL_DIR: path to mysql persistent files
- MYSQL_ROOT_PASSWORD: password for mysql backend database
- KEYCLOAK_DIR: path to keycloak installation files
- BACKEND_IMAGE: name of backend image
- FRONTEND_PROD_IMAGE: name of production frontend docker image
- FRONTEND_TESTING_IMAGE: name of testing frontend docker image


Build:
`make build`

Run:
`make run`

This will build the back and frontend images (including the testing frontend image) and start them up.


## Frontend

### Production

To build:

`make build-prod`

This will build the production docker image.


### Testing

To build:

`make build-testing`

This will install dependencies and build the testing docker image. Changes to files will go live immediately.

Local dev (run testing frontend against remote database and keycloak):

`make local-dev`


### Tests

Unit tests are run using Jest:

`npm run test:unit`


## Backend

To build:

`make build`


## Notes

`<style scoped>` does not work with text rendered by `v-html` (it does not have the data hash attached to it)

### Tomcat complaining (marlos-back)

`sudo ln -sv /usr/lib/x86_64-linux-gnu/libtcnative-1.so /usr/lib/`

