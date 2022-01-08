FROM openjdk:11
VOLUME /tmp
ARG TARGET=target
ARG JAR_FILE=*.jar
COPY ${TARGET}/${JAR_FILE} app.jar
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar /app.jar ${0} ${@}"]