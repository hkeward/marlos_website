FROM node:stretch AS builder

WORKDIR /build
ADD ./target/package.json ./
ADD ./target/src ./src
ADD ./target/tests ./tests

RUN npm install

RUN npm run build
#RUN npm run test:unit

FROM node:stretch-slim
COPY --from=builder /build/dist /dist

RUN npm install --global serve

ENTRYPOINT ["serve", "-s", "dist"]
