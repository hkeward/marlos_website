# Marlos website

A website and tools used to organize D&D encounters.


## Current setup

- Keycloak 6.0.1
- Spring boot REST backend
- Node serving Vue frontend
- nginx for reverse proxy

## Frontend

### Production

To build:

`npm run build`

This will build the files and store them in `marlos-front/dist/`

To serve:

`serve -s dist &`

Will serve on port 5000.


### Testing live server

View changes in real time -- start the development server. Recommended to start this in a screen session so it can be detached from.

`npm run serve -- --port 5500 &`

When changes are saved in Webstorm, changed files are automatically uploaded to the web server. Changes can then be seen at `testing.heatherward.dev`. This is to get around the issue of CORS/requesting things from localhost -> the real backend. Offline development is still problematic; this will hopefully be resolved when I dockerize the components and I can actually run the full stack locally.

Be aware that testing uses the same database as production; changes are real!


Build production version (of test deployment):

`npm run build -- --dest dist-testing`

Serve production version (of test deployment):

`serve -l 5500 dist-testing &`


### Tests

Unit tests are run using Jest:

`npm run test:unit`


## Backend

mvn package
java -jar target/marlos.jar


## Notes

`<style scoped>` does not work with text rendered by `v-html` (it does not have the data hash attached to it)
