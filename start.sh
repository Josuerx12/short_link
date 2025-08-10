#!/bin/bash

stop_containers() {
    echo "Encerrando containers..."
    docker compose -f ./short_link/docker-compose.yml down
    docker compose -f ./short_link_visits/docker-compose.yml down
    exit 0
}

trap stop_containers SIGINT SIGTERM

echo "Iniciando containers..."
docker compose -f ./short_link/docker-compose.yml up -d
docker compose -f ./short_link_visits/docker-compose.yml up -d

echo "Exibindo logs. Pressione Ctrl + C para encerrar e parar os containers."
docker compose -f ./short_link/docker-compose.yml logs --follow &
docker compose -f ./short_link_visits/docker-compose.yml logs --follow &
wait