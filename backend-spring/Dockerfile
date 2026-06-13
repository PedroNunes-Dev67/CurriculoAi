# Usa o maven para construir a aplicação e o JRE para rodar a aplicação
FROM maven:3.9.12-eclipse-temurin-21 AS build

WORKDIR /app

COPY ./pom.xml .

#Este comando baixa todas as dependências do projeto para o cache do Docker, evitando a necessidade de baixá-las novamente em etapas posteriores, o que acelera o processo de construção da imagem.
RUN mvn dependency:go-offline -B

COPY . .

#Compila o projeto e gera o arquivo JAR, ignorando os testes para acelerar o processo de construção da imagem. O resultado é um arquivo JAR que pode ser executado na etapa seguinte.
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

#Copia o arquivo JAR gerado na etapa de construção para a imagem final, renomeando-o para "app.jar". Este arquivo JAR é o artefato final que será executado quando a imagem for iniciada.
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

#Roda o arquivo JAR usando o comando "java -jar app.jar". Este comando é a entrada principal da imagem Docker, indicando que quando a imagem for executada, ela iniciará a aplicação Java contida no arquivo JAR.
ENTRYPOINT ["java","-jar","app.jar"]