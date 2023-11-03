https://github.com/cataniamatt/mongodb-docker

//make db
docker-compose build

//start db

docker-compose up -d

//stop db

docker-compose down

// to connect to mongodb in command line
docker exec -it mongo bash

// to connect to mongodb in command line
 mongosh --username root --password rootpassword

0. docker ps // get container name
1. get in container with docker exec -it <container_name> /bin/bash
2. mongosh

or 

1. docker exec -it <container_name> mongosh

//stop db
docker stop (name) && docker rm (name)

