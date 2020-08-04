export VERSION=$$(git rev-parse --short HEAD)
export FRONTEND_PROD_IMAGE="marlos-front-prod:${VERSION}"
export FRONTEND_TESTING_IMAGE="marlos-front-testing:${VERSION}"

build: build-prod build-testing

build-prod:
	rm -rf docker/prod/target
	mkdir -p docker/prod/target
	cp -r package.json src tests docker/prod/target/
	cd docker/prod && docker build --rm --no-cache -t ${FRONTEND_PROD_IMAGE} .

build-testing:
	npm install
	cd docker/testing && docker build --rm --no-cache -t ${FRONTEND_TESTING_IMAGE} .
