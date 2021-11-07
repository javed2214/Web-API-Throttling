# Web-API-Throttling
The repo is about limiting the access usage of APIs using Redis

In order to use this, make sure docker is installed on your machine.
Run the below commands in sequence

To build the image: 
**docker build -t nodeapp .**

To launch node, redis and haproxy containers: 
**docker-compose up -d**

To check how many containers are running: 
**docker ps**
