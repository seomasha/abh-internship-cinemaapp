# Build stage
FROM eclipse-temurin:17-jdk-jammy AS builder

# Postavi radni direktorij
WORKDIR /app

# Kopiraj Maven Wrapper direktorij, fajlove i postavi dozvole za izvršavanje
COPY .mvn/ .mvn/
COPY mvnw ./
COPY pom.xml ./
RUN chmod +x mvnw

# Testiraj da li su fajlovi pravilno kopirani
RUN ls -l .mvn/wrapper/

# Preuzmi Maven dependencije (offline mod za ubrzanje)
RUN ./mvnw dependency:go-offline -B

# Kopiraj source kod aplikacije i buildaj aplikaciju
COPY src ./src
RUN ./mvnw clean package -DskipTests


# Runtime stage
FROM eclipse-temurin:17-jre-jammy

# Postavi radni direktorij za runtime
WORKDIR /app

# Kopiraj buildani JAR fajl iz builder faze
COPY --from=builder /app/target/*.jar app.jar

# Izloži port 8080
EXPOSE 8080

# Pokreni aplikaciju
ENTRYPOINT ["java", "-jar", "app.jar"]
