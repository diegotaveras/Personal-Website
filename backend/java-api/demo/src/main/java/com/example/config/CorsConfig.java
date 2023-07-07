package com.example.config;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
// import javax.servlet.*;
// import javax.servlet.http.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;



// @Provider
// public class CORSFilter implements ContainerResponseFilter {            // an attempt at fixing the CORS issue i was getting trying to set up the AWS EC2 instance

//     @Override
//     public void filter(final ContainerRequestContext requestContext,
//                        final ContainerResponseContext cres) throws IOException {
//         cres.getHeaders().add("Access-Control-Allow-Origin", "*");
//         cres.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
//         cres.getHeaders().add("Access-Control-Allow-Credentials", "true");
//         cres.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
//         cres.getHeaders().add("Access-Control-Max-Age", "1209600");
//     }

// }


@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(false);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
