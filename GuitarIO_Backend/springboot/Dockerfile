# syntax=docker/dockerfile:1.7

FROM public.ecr.aws/docker/library/maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -DskipTests dependency:go-offline

COPY . .
RUN --mount=type=cache,target=/root/.m2 mvn -DskipTests clean package

FROM public.ecr.aws/docker/library/eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S app && adduser -S app -G app
COPY --from=build /app/target/*.jar app.jar
RUN chown app:app app.jar

USER app

ENV SERVER_PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "exec java -jar app.jar --server.port=${PORT:-8080}"]
