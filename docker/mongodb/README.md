https://github.com/cataniamatt/mongodb-docker
https://vsupalov.com/database-in-docker/

# GET STARTED
0. get into docker/mongodb
## build docker image
1. docker-compose up -d
2. docker exec -it mongo bash
## retores data in mongo dump
3. mongorestore --username root --password rootpassword /db-dump 


# if you want to use mongo compass
1. mongodb://root:rootpassword@localhost:27017/?authMechanism=DEFAULT


# debug
check if docker is using port 27017 by 
macOS: `lsof -i tcp:27017`

if you see com.docke under COMMAND then you are good if not then kill the process that is running
`kill -9 <PID>`

# completely reset docker db

docker system prune -a
docker volume prune 

//make db
docker-compose build

//start db

docker-compose up -d

//stop db

docker-compose down

// to connect to mongodb in command line
docker exec -it mongo bash

# to connect to mongodb in command line
 mongosh --username root --password rootpassword

0. docker ps // get container name
1. get in container with docker exec -it <container_name> /bin/bash
2. mongosh

or 

1. docker exec -it <container_name> mongosh

//stop db
docker stop (name) && docker rm (name)

# mongo dump
mongodump --username root --password rootpassword
docker cp <containerId>:/file/path/within/container /host/path/target

//mongo restore
mongorestore --username root --password rootpassword (dump folder)


# check brew list
brew services list
# stop local mongo
brew services stop mongodb-community

