FROM 15.8.0-alpine3.10

RUN git clone https://github.com/currentlib/interentMonitor.git

RUN cd interentMonitor

EXPOSE 3000

CMD ["node", "index.js"]