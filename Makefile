build:
	$(MAKE) -C marlos-back
	$(MAKE) -C marlos-front

run:	build
	docker-compose down
	docker-compose up -d
