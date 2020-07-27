export VERSION=$$(git rev-parse --short HEAD)
export BACKEND_IMAGE="marlos-back:${VERSION}"

build:
	rm -rf docker/target
	mkdir -p docker/target
	cp -r src pom.xml .mvn docker/target
	cd docker && docker build --rm -t ${BACKEND_IMAGE} .

