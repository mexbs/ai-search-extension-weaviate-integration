FROM node:20.19.0

ENV TZ=UTC
RUN echo $TZ > /etc/timezone && mkdir -p /yc
RUN npm install -g typescript
RUN mkdir -p /yc/dist

WORKDIR /yc
COPY package.json /yc
COPY loadConfig.ts /yc
RUN npm install

COPY src /yc/src
COPY *.yaml /yc/
COPY config.json /yc
COPY config.main.json /yc
COPY tsconfig.json /yc
RUN npm run build

RUN usermod --uid 26770 node && groupmod --gid 26770 node

USER 26770

CMD ["node", "--max-old-space-size=30720", "--trace-warnings", "dist/src/index.js"]