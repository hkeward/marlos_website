VERSION=$$(git rev-parse --short HEAD)
PROD_IMAGE="marlos-front-prod"
TESTING_IMAGE="marlos-front-testing"

build: build-prod build-testing

build-prod:
	rm -rf docker/prod/target
	mkdir -p docker/prod/target
	cp -r package.json src tests docker/prod/target/
	cd docker/prod && docker build --rm --no-cache -t $(PROD_IMAGE):$(VERSION) .
	docker tag $(PROD_IMAGE):$(VERSION) $(PROD_IMAGE):latest

build-testing:
	npm install
	cd docker/testing && docker build --rm --no-cache -t $(TESTING_IMAGE):$(VERSION) .
	docker tag $(TESTING_IMAGE):$(VERSION) $(TESTING_IMAGE):latest

local-dev: build-testing
	cd .. && docker-compose up -d frontend-testing
