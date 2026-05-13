package br.com.CurriculoAi.services;

import br.com.CurriculoAi.DTO.CerebrasRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Service
public class CerebrasService {

    @Value("${cerebras.api.key}")
    private String apiKey;

    @Value("${cerebras.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String gerarMarkdawn(CerebrasRequestDTO requestDTO) throws Exception {

        //envia o request para o cerebras
        String bodyJson = objectMapper.writeValueAsString(requestDTO);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.setContentLength(
                bodyJson.getBytes(StandardCharsets.UTF_8).length
        );

        HttpEntity<String> request =
                new HttpEntity<>(bodyJson, headers);

        //recebe a resposta do cerebras
        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        apiUrl,
                        request,
                        Map.class
                );
        List<Map> choices =
                (List<Map>) response.getBody().get("choices");

        //pega o markdown
        Map message =
                (Map) choices.get(0).get("message");

        return (String) message.get("content");
    }
}