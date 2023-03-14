package com.example.controllers;


import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;
import se.michaelthelin.spotify.requests.data.playlists.GetListOfCurrentUsersPlaylistsRequest;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.model_objects.specification.Episode;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.PlaylistTrack;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.playlists.GetPlaylistsItemsRequest;

import org.apache.hc.core5.http.ParseException;


import java.io.IOException;
import java.net.URI;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import javax.servlet.http.HttpServletResponse;









@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AuthController {
    private static final URI redirectURI = SpotifyHttpManager.makeUri("http://localhost:8000/api/get-user-code/");
    private String code = "";

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
    .setClientId("01a5a5acf2c241f2aa7f38695368c12c")
    .setClientSecret("ee96c0417592482f87b2186fadaa32ea")
    .setRedirectUri(redirectURI)
    .build();



    @GetMapping("login")
    @ResponseBody
    public String spotifyLogin() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
        .scope("user-read-private, user-read-email, playlist-read-private, playlist-read-collaborative")
        .show_dialog(true)
        .build();

        final URI uri = authorizationCodeUriRequest.execute();

        return uri.toString();

    }
    @GetMapping("get-user-code")
    public String getSpotifyUserCode(@RequestParam("code") String userCode, HttpServletResponse response) throws IOException {
        code = userCode;
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code).build();


        try {
            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();

            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());

        } catch (IOException | SpotifyWebApiException | org.apache.hc.core5.http.ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
        response.sendRedirect("http://localhost:3000/user-playlists");
        return spotifyApi.getAccessToken();
    }


    @GetMapping(value = "user-playlists")
    public PlaylistSimplified[] getUserPlaylists() {
        
        final GetListOfCurrentUsersPlaylistsRequest getListOfCurrentUsersPlaylistsRequest = spotifyApi.getListOfCurrentUsersPlaylists()
        .limit (10)
        .offset(0).build();
        try {
            final Paging<PlaylistSimplified> playlistPaging = getListOfCurrentUsersPlaylistsRequest.execute();

            return playlistPaging.getItems();

        } catch (Exception e) {
            System.out.println("Something's wrong" + e.getMessage());
        }
        
        return new PlaylistSimplified[0];
    }

    public PlaylistTrack[] getPlaylistTracks() {
        final GetPlaylistsItemsRequest getPlaylistsItemsRequest = spotifyApi.getPlaylistItems()
        .limit (10)
        .offset(0).build();
        try {
            final Paging<PlaylistTrack> tracksPaging = getPlaylistsItemsRequest.execute();

            return tracksPaging.getItems();

        } catch (Exception e) {
            System.out.println("Something's wrong" + e.getMessage());
        }
        
        return new PlaylistTrack[0];
    }


}

// public class AuthorizationCodeExample {
//     private static final String clientId = "zyuxhfo1c51b5hxjk09x2uhv5n0svgd6g";
//     private static final String clientSecret = "zudknyqbh3wunbhcvg9uyvo7uwzeu6nne";
//     private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:3000/contact/");
//     private static final String code = "";
  
//     private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
//       .setClientId(clientId)
//       .setClientSecret(clientSecret)
//       .setRedirectUri(redirectUri)
//       .build();
//     private static final AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
//       .build();
  
//     public static void authorizationCode_Sync() {
//       try {
//         final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
  
//         // Set access and refresh token for further "spotifyApi" object usage
//         spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
//         spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
  
//         System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());
//       } catch (IOException | SpotifyWebApiException | ParseException e) {
//         System.out.println("Error: " + e.getMessage());
//       }
//     }
  
//     public static void authorizationCode_Async() {
//       try {
//         final CompletableFuture<AuthorizationCodeCredentials> authorizationCodeCredentialsFuture = authorizationCodeRequest.executeAsync();
  
//         // Thread free to do other tasks...
  
//         // Example Only. Never block in production code.
//         final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeCredentialsFuture.join();
  
//         // Set access and refresh token for further "spotifyApi" object usage
//         spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
//         spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
  
//         System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());
//       } catch (CompletionException e) {
//         System.out.println("Error: " + e.getCause().getMessage());
//       } catch (CancellationException e) {
//         System.out.println("Async operation cancelled.");
//       }
//     }
  
//     public static void main(String[] args) {
//       authorizationCode_Sync();
//       authorizationCode_Async();
//     }
//   }








// import java.net.URI;
// import java.util.Arrays;
// import javax.servlet.http.HttpServletResponse;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import com.google.gson.JsonObject;
// import com.wrapper.spotify.SpotifyApi;
// import com.wrapper.spotify.SpotifyHttpManager;
// import com.wrapper.spotify.enums.TokenType;
// import com.wrapper.spotify.exceptions.SpotifyWebApiException;
// import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
// import com.wrapper.spotify.model_objects.specification.User;
// import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
// import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;

// @RestController
// @RequestMapping("/api")
// public class AuthController {

//   private static final String CLIENT_ID = "01a5a5acf2c241f2aa7f38695368c12c";
//   private static final String CLIENT_SECRET = "ee96c0417592482f87b2186fadaa32ea";
//   private static final URI REDIRECT_URI = SpotifyHttpManager.makeUri("http://localhost:8000/api/get-user-code");

//   private final SpotifyApi spotifyApi = new SpotifyApi.Builder()
//       .setClientId(CLIENT_ID)
//       .setClientSecret(CLIENT_SECRET)
//       .setRedirectUri(REDIRECT_URI)
//       .build();

//   private String state = "";

//   @GetMapping("/login")
//   public void spotifyLogin(HttpServletResponse response) throws Exception {
//     // Generate state parameter (to prevent cross-site request forgery attacks)
//     state = SpotifyHttpManager.getSecureRandom().nextInt() + "";

//     // Define scopes (permissions) required by your app
//     final String[] scopes = new String[]{"user-read-private", "user-read-email", "playlist-read-private"};

//     // Build the authorization URL request
//     final AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
//         .state(state)
//         .scope(Arrays.asList(scopes))
//         .show_dialog(true)
//         .build();

//     // Redirect the user to the authorization URL
//     final URI uri = authorizationCodeUriRequest.execute();
//     response.sendRedirect(uri.toString());
//   }

//   @GetMapping("/callback")
//   public String spotifyCallback(String code, String state) throws Exception {
//     if (!state.equals(this.state)) {
//       throw new Exception("Invalid state parameter");
//     }

//     // Request access and refresh tokens using the authorization code
//     final AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code).build();
//     final AuthorizationCodeCredentials credentials = authorizationCodeRequest.execute();

//     // Set access and refresh tokens in the Spotify API instance
//     spotifyApi.setAccessToken(credentials.getAccessToken());
//     spotifyApi.setRefreshToken(credentials.getRefreshToken());

//     // Use the access token to retrieve the user's profile
//     final User currentUser = spotifyApi.getCurrentUsersProfile().build().execute();
//     final JsonObject currentUserJson = new JsonObject();
//     currentUserJson.addProperty("display_name", currentUser.getDisplayName());
//     currentUserJson.addProperty("email", currentUser.getEmail());
//     currentUserJson.addProperty("spotify_id", currentUser.getId());

//     // Return user profile JSON data to the client
//     return currentUserJson.toString();
//   }

// }