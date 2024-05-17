FROM openjdk:17.0.1 AS build

WORKDIR /app

COPY src /app/src

RUN javac src/Main.java

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app

COPY --from=build /app/src/Main.class /app

ENV MESSAGE "test message"

CMD ["java", "Main"]
