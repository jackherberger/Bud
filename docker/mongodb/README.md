https://manglekuo.medium.com/running-mongodb-on-docker-with-macos-b08324f5aab2


//make db
docker-compose build

//start db

docker-compose up -d

//stop db

docker-compose down

// to connect to mongodb in command line
docker exec -it mongodb bash


0. docker ps // get container name
1. get in container with docker exec -it <container_name> /bin/bash
2. mongosh

or 

1. docker exec -it <container_name> mongosh

