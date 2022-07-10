#switch docker context
docker context use opakvf.stackhero-network.com  

#bring down the existing containers
docker-compose down; docker-compose build; docker-compose up -d

#bring up the new containers
docker-compose up -d