use-local-context:
	docker context use default
up-local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d
	docker-compose logs stripe | grep --color "signing secret is .*"
up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
rebuild-local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml down
	docker-compose -f docker-compose.yml -f docker-compose.local.yml build
	docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d
	docker-compose exec -T app service cron start
	docker-compose logs stripe | grep --color "signing secret is .*"