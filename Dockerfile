# Stage 1: Build using Maven and JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the entire root directory
COPY . .

# Run the build from the root, targeting the backend pom
# This triggers the frontend-maven-plugin to build your 'client' folder
RUN mvn -f backend/pom.xml clean package -DskipTests

# Stage 2: Runtime using JRE 21 (Slimmer image)
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/backend/target/*.jar app.jar

# Standard Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]