setup:
	npm install

run:
	docker compose up --build

test:
	docker compose run --rm app npm test