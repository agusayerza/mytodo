FROM postgres:latest

ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB todo_app

COPY scripts/* /docker-entrypoint-initdb.d/