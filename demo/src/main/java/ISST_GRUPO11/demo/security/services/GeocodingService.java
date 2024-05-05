package ISST_GRUPO11.demo.security.services;

import org.springframework.web.client.RestTemplate;
import ISST_GRUPO11.demo.models.Coordinates;

public class GeocodingService {

    private static final String API_KEY = "tu_api_key_aqui";

    public static Coordinates getCoordinatesFromAddress(String address) {
        RestTemplate restTemplate = new RestTemplate();
        String apiUrl = "http://api.positionstack.com/v1/forward?access_key=" + API_KEY + "&query=" + address;
        String response = restTemplate.getForObject(apiUrl, String.class);
        // Parse the JSON response to extract latitude and longitude
        // This step depends on the JSON parsing library you are using (e.g., Jackson,
        // Gson)
        // For simplicity, let's assume you have a method parseJsonToCoordinates that
        // does this
        return parseJsonToCoordinates(response);
    }

    // This method should parse the JSON response and return an object of type
    // Coordinates
    private static Coordinates parseJsonToCoordinates(String jsonResponse) {
        // Implement JSON parsing logic here
        return null;
    }
}