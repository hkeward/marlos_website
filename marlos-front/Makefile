VERSION=$$(git rev-parse --short HEAD)
PROD_IMAGE="marlos-front-prod:${VERSION}"
TESTING_IMAGE="marlos-front-testing:${VERSION}"

build: build-prod build-testing

build-prod:
	rm -rf docker/prod/target
	mkdir -p docker/prod/target
	cp -r package.json src tests docker/prod/target/
	cd docker/prod && docker build --rm --no-cache -t ${PROD_IMAGE} .
	docker tag ${PROD_IMAGE} marlos-front-prod:latest

build-testing:
	npm install
	cd docker/testing && docker build --rm --no-cache -t ${TESTING_IMAGE} .
	docker tag ${TESTING_IMAGE} marlos-front-testing:latest

local-dev: build-testing
	cd .. && docker-compose up -d frontend-testing
