Running the application locally
```bash
docker-compose up -d --build
```

SSHing into the laravel container
```bash
docker-compose exec php-apache /bin/bash
```


Deploying on Stack Hero
* Uncomment the line in app.dockerfile
* Comment out the 2 lines in docker-compose.yml
* Update the tag in docker-compose.yml
* Update .env environment to production

Rebuilding containers
docker-compose down; docker-compose build; docker-compose up -d           
