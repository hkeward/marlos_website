FROM maven:3.6.3-adoptopenjdk-8 AS builder

WORKDIR /build
ADD ./target/src ./src
ADD ./target/pom.xml ./
ADD ./target/.mvn ./.mvn

RUN mvn package -DskipTests


FROM openjdk:11
COPY --from=builder /build/target/marlos-0.0.1-SNAPSHOT.jar ./marlos.jar

ENTRYPOINT ["java", "-Dorg.apache.el.parser.COERCE_TO_ZERO=false", "-jar", "/marlos.jar"]
