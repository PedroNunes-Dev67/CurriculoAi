package br.com.CurriculoAi.DTO;

public class MessageDTO {

    //json do propt cerebras

    private String role;
    private String content;

    public MessageDTO(String role, String content) {
        this.role = role;
        this.content = content;
    }

    public String getRole() {
        return role;
    }

    public String getContent() {
        return content;
    }
}
