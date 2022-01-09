FROM maven:3-jdk-12 AS mvn_build
WORKDIR /build

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src/main src/main
RUN mvn package

FROM openjdk:11
ARG TARGET=build/target
ARG JAR_FILE=*.jar
COPY --from=mvn_build ${TARGET}/${JAR_FILE} app.jar
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar /app.jar ${0} ${@}"]