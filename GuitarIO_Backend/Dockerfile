FROM public.ecr.aws/docker/library/maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app
COPY springboot/ .
RUN chmod +x mvnw || true
RUN mvn -DskipTests clean package

FROM public.ecr.aws/docker/library/maven:3.9.9-eclipse-temurin-21
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]
