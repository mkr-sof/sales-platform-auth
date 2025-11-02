setup:
	npm install

run:
	docker compose up --build
	
stop:
	docker compose down

test:
	docker compose run --rm app npm test

clean:
	docker compose down -v