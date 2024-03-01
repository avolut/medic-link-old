FROM oven/bun:latest as base
WORKDIR /app/prasi

RUN apt-get update
RUN apt-get install git curl gnupg zip unzip -yq
RUN git config --global --add safe.directory /app/prasi/repo
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get update
RUN apt-get install nodejs -yq

RUN bun install
COPY . .

EXPOSE 3000/tcp
CMD [ "bun", "run", "prod" ]
