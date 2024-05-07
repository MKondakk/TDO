FROM gradle:jdk17
WORKDIR /app

COPY . .

RUN gradle build

COPY app/build/libs/app.jar .

CMD ["java", "-jar", "app.jar"]