package com.example.springbootserverless;

import java.util.HashMap;
import java.util.Map;

import com.amazonaws.secretsmanager.caching.SecretCache;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Secret {

        public Map<String,String> secretMap = new HashMap<String,String>(0);
        public Secret(String secretId) {
                final SecretCache cache = new SecretCache();
                String secret  = cache.getSecretString(secretId);
                String jsonString = secret;

                        // Create an instance of ObjectMapper
                ObjectMapper objectMapper = new ObjectMapper();

                // Convert the JSON string to a Map object
                try {
                        secretMap = objectMapper.readValue(jsonString, Map.class);


                } catch (JsonProcessingException e) {
                        System.out.println("Parse error: " + e);
                } 
                cache.close();

                
        }
        public String getSecretValue(String key) {
                return secretMap.get(key);
        }
        
    
}
// String clientID = "01a5a5acf2c241f2aa7f38695368c12c";
// String clientSecret = "ee96c0417592482f87b2186fadaa32ea";