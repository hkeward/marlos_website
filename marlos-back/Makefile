VERSION=$$(git rev-parse --short HEAD)
MARLOS_BACKEND_IMAGE="marlos-back"

build:
	rm -rf docker/target
	mkdir -p docker/target
	cp -r src pom.xml .mvn docker/target
	cd docker && docker build --rm --no-cache -t $(MARLOS_BACKEND_IMAGE):$(VERSION) .
	docker tag $(MARLOS_BACKEND_IMAGE):$(VERSION) $(MARLOS_BACKEND_IMAGE):latest
