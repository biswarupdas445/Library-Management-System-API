FROM node:14

RUN mkdir -p /usr/
WORKDIR /usr/
COPY package.json server.js wait.sh ./
COPY app ./app
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
RUN npm install 

EXPOSE 8080
CMD /wait && npm start