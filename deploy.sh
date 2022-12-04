#!/bin/bash
clear

if [ $1 == "--help" ]; then
    echo "--clean : clean container before start"
    echo "--dev : use dev env"
    echo "--prod : use prod env"
fi

if [ $1 == "--clean" ]; then
    echo "If exists, remove..."
    docker-compose -f "./.docker/docker-compose.yml" --env-file ./.docker/.env.dev --remove-orphans
    exit 0
fi

if [ $1 == "--dev" ]; then
    echo "> starting dev env..."
    docker-compose -f "./.docker/docker-compose.yml" --env-file ./.docker/.env.dev --profile development up --build 
fi

if [ $1 == "--prod" ]; then
    echo "> start prod env..."
    docker-compose -f "./.docker/docker-compose.yml"  --env-file ./.docker/.env.prod up -d --build
fi

sleep 2
echo "------------------"
docker ps -a
echo "------------------"