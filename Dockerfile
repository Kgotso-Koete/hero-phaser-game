### With help from: https://dev.to/avatsaev/create-efficient-angular-docker-images-with-multi-stage-builds-1f3n ###
### STAGE 1: Build ###     

# We label our stage as ‘builder’
FROM node:12.14.1 as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /hero-phaser-game && mv ./node_modules ./hero-phaser-game

WORKDIR /hero-phaser-game

COPY . .

## Build the angular app in production mode and store the artifacts in www folder
RUN npm run build


### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/* 

## From ‘builder’ stage copy over the artifacts in www folder to default nginx public folder
COPY --from=builder /hero-phaser-game/www /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]