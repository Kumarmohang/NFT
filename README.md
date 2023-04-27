BUILD docker IMAGE :-> `docker build -t nft .`

RUN docker backend service :-> `docker-compose -f docker-compose.yaml up -d`

Run postgres container :-> `docker exec -it postgres_container /bin/bash`

Login postgres :-> `psql -U postgres`

Create database :-> `CREATE DATABASE nft_marketplace WITH OWNER = postgres ENCODING = 'UTF8' CONNECTION LIMIT = -1;`

Run migrations :-> `npm run migrations`

Seed data :-> `npm run seeder`

start server :-> `npm run prod`
