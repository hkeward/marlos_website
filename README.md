# Marlos website

A website and tools used to organize D&D encounters.


## Current setup

Keycloak 6.0.1
Wildfly 10.0.0 with Keycloak adapter

nginx

## Frontend

### Production

To build:

`npm run build`

This will build the files and store them in `marlos-front/dist/`

To serve:

`serve -s dist &`

Will serve on port 5000.


### Testing

To build:

`npm run build -- --dest dist-testing`

To serve:

`serve -l 5500 dist-testing`

Will serve on port 5500 (testing.heatherward.dev)
