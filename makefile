use-local-context:
	docker context use default
use-prod-context:
	docker context use ***REMOVED***
up-local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d
up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
rebuild-local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml down
	docker-compose -f docker-compose.yml -f docker-compose.local.yml build
	docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d
prepare-prod:
	npm run build
rebuild-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d