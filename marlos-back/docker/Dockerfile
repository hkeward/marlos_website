FROM maven:3.6.3-adoptopenjdk-8 AS builder

WORKDIR /build
ADD ./target/src ./src
ADD ./target/pom.xml ./
ADD ./target/.mvn ./.mvn

RUN apt-get -qq update && \
	apt-get -qq install mysql-server

# mysql must be running for tests to work
RUN service mysql start && mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''; FLUSH PRIVILEGES;" && mvn package


FROM openjdk:11
COPY --from=builder /build/target/marlos-0.0.1-SNAPSHOT.jar ./marlos.jar

ENTRYPOINT ["java", "-Dorg.apache.el.parser.COERCE_TO_ZERO=false", "-jar", "/marlos.jar"]
