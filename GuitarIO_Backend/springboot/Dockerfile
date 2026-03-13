FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app
COPY . .
RUN chmod +x mvnw || true
RUN mvn -DskipTests clean package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["sh", "-c", "java -jar app.ja# neuen orphan-branch ohne history erstellen
                                  git checkout --orphan main_new

                                  # alles neu hinzufügen
                                  git add -A
                                  git commit -m "Fresh start"

                                  # alten main ersetzen
                                  git branch -D main
                                  git branch -m main

                                  # force push
                                  git push -f origin mainr --server.port=${PORT:-8080}"]