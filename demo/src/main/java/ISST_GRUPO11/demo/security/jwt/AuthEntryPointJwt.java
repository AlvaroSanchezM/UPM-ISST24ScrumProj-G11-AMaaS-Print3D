package ISST_GRUPO11.demo.security.jwt;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException)
            throws IOException, ServletException {
        logger.error("Unauthorized error: {}", authException.getMessage());

        // Set the response status code
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // Create a map to hold the custom error details
        Map<String, String> errorDetails = new HashMap<>();
        errorDetails.put("error", "Acceso denegado");
        errorDetails.put("message", "Las credenciales proporcionadas no son válidas.");

        // Convert the error details map to JSON
        String jsonErrorDetails = new ObjectMapper().writeValueAsString(errorDetails);

        // Set the content type and write the JSON error details to the response
        response.setContentType("application/json");
        response.getWriter().write(jsonErrorDetails);
    }
}
