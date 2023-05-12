# Image source
FROM node:20

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY package*.json .

# Copy current directory to APP folder
COPY . .

COPY ./.env ./.env

EXPOSE 4000
EXPOSE 5432

CMD ["npm", "run", "start:dev"]