package br.com.CurriculoAi.exceptions;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe padrão para retorno de erros.
 * Utilizada em todas as exceções da aplicação.
 */
@Data
public class ErrorResponse {

    private int status;
    private String message;
    private String path;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime timestamp;
    private List<String> errors;

    public ErrorResponse() {
        this.timestamp = LocalDateTime.now();
        this.errors = new ArrayList<>();
    }

    // Construtor com HttpServletRequest
    public ErrorResponse(int status, String message, HttpServletRequest request) {
        this();
        this.status = status;
        this.message = message;
        this.path = request.getRequestURI();
    }

    public ErrorResponse(int status, String message, HttpServletRequest request, List<String> errors) {
        this(status, message, request);
        this.errors = errors;
    }
}

