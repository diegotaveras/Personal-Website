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

                ObjectMapper objectMapper = new ObjectMapper();

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
