FROM node:latest

EXPOSE 3001

WORKDIR /reservation-app-back

RUN npm update -g npm && \
  npm install -g n && \
  n lts && \
  npm update -g npm && \
  npm install
