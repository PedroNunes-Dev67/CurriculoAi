package br.com.CurriculoAi.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfiguration {

    private String securityFormat = "Bearer Authentication";

    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI()
                .info(new Info()
                                .title("CurriculoAI Documentaion API")
                                .description("Documetation from CurriculoAI for Developers")
                                .version("v1.0")
                                .contact(new Contact().name("CurriculoAI Suporte").email("suporte.curriculoai@gmail.com"))
                )
                .addSecurityItem(new SecurityRequirement().addList(securityFormat))
                .components(new Components().addSecuritySchemes(securityFormat, createApiKeyOpenApi()));
    }

    private SecurityScheme createApiKeyOpenApi(){
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("Bearer");
    }
}
