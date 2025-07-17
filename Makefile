.PHONY: install up down sh test lint fix install-hooks

NODE_SERVICE=app

install:
	docker-compose build
	docker-compose up -d

up:
	docker-compose up -d

down:
	docker-compose down

sh:
	docker-compose exec $(NODE_SERVICE) sh

test:
	docker-compose exec $(NODE_SERVICE) npm run test

lint:
	docker-compose exec $(NODE_SERVICE) npm run lint

fix:
	docker-compose exec $(NODE_SERVICE) npm run lint:fix

install-hooks:
	cp .githooks/pre-commit .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit
	@echo "Git Hook installed"

import-stations:
	docker-compose exec ${NODE_SERVICE} npx tsx src/scripts/importStations.ts
