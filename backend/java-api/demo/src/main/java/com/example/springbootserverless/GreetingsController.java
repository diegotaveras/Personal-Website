package com.example.springbootserverless;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import java.util.List;
import org.springframework.http.ResponseEntity;
/**
 *
 * A sample greetings controller to return greeting text
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GreetingsController {
    /**
     *
     * @param name the name to greet
     * @return greeting text
     */
    @RequestMapping(value = "/{name}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity <GreetingResponse> greetingText(@PathVariable String name) {
        String greeting = "Hello " + name + "!";
        return ResponseEntity.ok(new GreetingResponse(greeting));
    }
    public static class GreetingResponse {
        private String greeting;

        public GreetingResponse(String greeting) {
            this.greeting = greeting;
        }

        public String getGreeting() {
            return greeting;
        }

        public void setGreeting(String greeting) {
            this.greeting = greeting;
        }
    }
}


