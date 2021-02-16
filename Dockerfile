FROM node:alpine3.10

RUN apk update && apk upgrade && \
    apk add --no-cache bash git

RUN git clone https://github.com/currentlib/interentMonitor.git

WORKDIR /interentMonitor

# RUN git clone http://gx-zwewebdwv040:8080/tfs/DefaultCollection/_git/YuriysNetworkMontoring

# WORKDIR /YuriysNetworkMontoring

EXPOSE 3000

CMD ["node", "index.js"]
