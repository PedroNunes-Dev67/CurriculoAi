package br.com.CurriculoAi.DTO.request;

import br.com.CurriculoAi.DTO.MessageDTO;

import java.util.List;

public class CerebrasRequestDTO {

    private String model;
    private List<MessageDTO> messages;

    public CerebrasRequestDTO(String prompt) {

        //this.model = "llama3.1-8b";
        this.model = "gpt-oss-120b";

        this.messages = List.of(
                new MessageDTO("user", prompt)
        );
    }

    public String getModel() {
        return model;
    }

    public List<MessageDTO> getMessages() {
        return messages;
    }
}