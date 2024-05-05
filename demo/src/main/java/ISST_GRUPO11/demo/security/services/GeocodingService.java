package ISST_GRUPO11.demo.security.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestTemplate;
import ISST_GRUPO11.demo.models.Coordinates;

public class GeocodingService {

    private static final String API_KEY = "AIzaSyA7s1147GX_tuFwDCrD5Z_YXKbYl13L6t0";

    public static Coordinates getCoordinatesFromAddress(String address) {
        RestTemplate restTemplate = new RestTemplate();
        String apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + API_KEY;
        String response = restTemplate.getForObject(apiUrl, String.class);
        return parseJsonToCoordinates(response);
    }

    private static Coordinates parseJsonToCoordinates(String jsonResponse) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(jsonResponse);
            JsonNode resultsNode = rootNode.path("results");
            if (resultsNode.size() > 0) {
                JsonNode locationNode = resultsNode.get(0).path("geometry").path("location");
                Double latitude = locationNode.get("lat").asDouble();
                Double longitude = locationNode.get("lng").asDouble();
                return new Coordinates(latitude, longitude);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
