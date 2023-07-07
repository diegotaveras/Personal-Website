package com.example.springbootserverless;

import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.model.HttpApiV2ProxyRequest;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import org.springframework.http.HttpHeaders;
import java.net.http.HttpResponse;
import javax.ws.rs.core.Application;
import com.amazonaws.serverless.proxy.spring.SpringBootProxyHandlerBuilder;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;



// public class LambdaHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
//     private static final ObjectMapper objectMapper = new ObjectMapper();
//     private static final AuthController authController = new AuthController();
//     // private static final GreetingsController greetingController = new GreetingsController();

//     @Override
//     public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent request, Context context) {
        
//         LambdaLogger logger = context.getLogger();
//         logger.log("Request: " + request);

//         String path = request.getPath();
//         String httpMethod = request.getHttpMethod();
//         Map<String, String> queryStringParameters = request.getQueryStringParameters();

//         APIGatewayProxyResponseEvent responseEvent = new APIGatewayProxyResponseEvent();
//         Map<String,String> headersMap = new HashMap<>();


//         if (path.equals("/api/login") && httpMethod.equals("GET")) {
//             ResponseEntity<String> loginUrl = authController.spotifyLogin();
//             responseEvent.setStatusCode(200);
//             responseEvent.setBody(loginUrl.getBody());

//         } else if (path.startsWith("/api/get-user-code") && httpMethod.equals("GET")) {
//             String userCode = queryStringParameters.get("code");

//             try {
//                 ResponseEntity<String> userCodeResponse= authController.getSpotifyUserCode(userCode);
//                 responseEvent.setStatusCode(302);
//                 responseEvent.setBody(userCodeResponse.getBody());
//                 // responseEvent = serializeResponse(responseEvent);
//                 HttpHeaders headers = userCodeResponse.getHeaders();
//                 headersMap.put("Location", headers.getFirst("Location"));

//             } catch (IOException e){
//                 responseEvent.setStatusCode(500);
//             }
            
//         } else if (path.equals("/api/user-playlists") && httpMethod.equals("GET")) {
//             ResponseEntity<PlaylistSimplified[]> playlistsResponse = authController.getUserPlaylists();
//             try {
//                 ObjectMapper objectMapper = new ObjectMapper();
//                 String playlistsJson = objectMapper.writeValueAsString(playlistsResponse.getBody());
//                 responseEvent.setStatusCode(200);
//                 responseEvent.setBody(playlistsJson);
//                 System.out.println("Output: " + playlistsJson);
//                 System.out.println("Output 2: " + playlistsResponse.toString());

//             } catch (Exception e){
//                 System.out.println(e);
//                 responseEvent.setStatusCode(500);

//             }
//         // } else if (path.startsWith("/api/user-playlists/") && httpMethod.equals("GET")) {
//         //     String playlistId = path.substring("/api/user-playlists/".length());
//         //     PlaylistTrack[] tracksResponse = authController.getPlaylistTracks(playlistId);
//         //     responseEvent.setBody(tracksResponse.toString());
//         // } else if (path.startsWith("/api/user-playlists/") && path.endsWith("/stats") && httpMethod.equals("GET")) {
//         //     String playlistId = path.substring("/api/user-playlists/".length(), path.lastIndexOf("/stats"));
//         //     APIGatewayProxyResponseEvent statsResponse = authController.getPlaylistStats(playlistId);
//         //     responseEvent = serializeResponse(statsResponse);
//         // } else if (path.startsWith("/api/user-playlists/") && httpMethod.equals("GET")) {
//         //     String playlistId = path.substring("/api/user-playlists/".length());
//         //     String trackId = queryStringParameters.get("trackId");
//         //     APIGatewayProxyResponseEvent trackStatsResponse = authController.getTrackStats(playlistId, trackId);
//         //     responseEvent = serializeResponse(trackStatsResponse);
//         // } else if (path.equals("/api/greeting") && httpMethod.equals("GET")) {
//         //     APIGatewayProxyResponseEvent greetingResponse = greetingController.getGreeting();
//         //     responseEvent = serializeResponse(greetingResponse);
//         } else {
//             responseEvent = new APIGatewayProxyResponseEvent();
//             responseEvent.setStatusCode(404);
//             responseEvent.setBody("Not Found");
            
//         }

//         logger.log("Response: " + responseEvent);
//         headersMap.put("Access-Control-Allow-Origin", "http://localhost:3000");
//         responseEvent.setHeaders(headersMap);
//         return responseEvent;
//     }

//     private APIGatewayProxyResponseEvent serializeResponse(APIGatewayProxyResponseEvent responseEvent) {
//         try {
//             String body = objectMapper.writeValueAsString(responseEvent.getBody());
//             responseEvent.setBody(body);
//         } catch (IOException e) {
//             // Handle JSON serialization error
//             responseEvent.setStatusCode(500);
//             responseEvent.setBody("Internal Server Error");
//         }
//         return responseEvent;
//     }
// }




// public class LambdaHandler implements RequestHandler<AwsProxyRequest, AwsProxyResponse> {
//     private static SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

//     static {
//         try {
//             handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(Application.class); }
//         catch (ContainerInitializationException ex){
//             throw new RuntimeException("Unable to load spring boot application",ex); }
//     }

//     @Override
//     public APIGatewayProxyResponseEvent handleRequest(AwsProxyRequest input, Context context) {
//         handler.proxy(input, context);
//         APIGatewayProxyResponseEvent responseEvent = new APIGatewayProxyResponseEvent();
//         responseEvent.setStatusCode(404);
//         responseEvent.setBody("Not Found");
            
//         return responseEvent;
//     }
    
// }

public class StreamLambdaHandler implements RequestStreamHandler {
    private static final SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

    static {
        try {
            handler = new SpringBootProxyHandlerBuilder<AwsProxyRequest>()
                    .defaultProxy()
                    .asyncInit()
                    .springBootApplication(Application.class)
                    .buildAndInitialize();
        } catch (ContainerInitializationException e) {
            e.printStackTrace();
            throw new RuntimeException("Could not initialize Spring Boot application", e);
        }
    }
    
    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context)
            throws IOException {
        handler.proxyStream(inputStream, outputStream, context);
        
        System.out.println("Hello input" + inputStream);
        System.out.println("Hello output" + outputStream);
        System.out.println("Hello context" + handler.getServletContext());
        
    }
    
}




