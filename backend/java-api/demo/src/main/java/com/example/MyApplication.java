package com.example;

// import javax.ws.rs.container.ContainerRequestContext;
// import javax.ws.rs.container.ContainerResponseContext;
// import javax.ws.rs.container.ContainerResponseFilter;
// import javax.ws.rs.ext.Provider;
import com.example.springbootserverless.AuthController;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.HandlerAdapter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


/**
 *
 * Spring Boot application starter class
 */
@SpringBootApplication
@Import({AuthController.class})
public class Application {
   

    @Bean
    public HandlerMapping handlerMapping() {
        return new RequestMappingHandlerMapping();
    }

    /*
     * Create required HandlerAdapter, to avoid several default HandlerAdapter instances being created
     */
    @Bean
    public HandlerAdapter handlerAdapter() {
        return new RequestMappingHandlerAdapter();
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    // @Bean
    // public WebMvcConfigurer configure() {
    //     return new WebMvcConfigurer() {
    //         @Override 
    //         public void addCorsMappings(CorsRegistry reg) {
    //             reg.addMapping("/**").allowedOrigins("*");
    //         }
    //     };
    // }
}


