package com.example.springbootserverless;

import java.util.HashMap;

import java.util.ArrayList;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;
import se.michaelthelin.spotify.requests.data.playlists.GetListOfCurrentUsersPlaylistsRequest;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;

import se.michaelthelin.spotify.model_objects.specification.PlaylistTrack;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.playlists.GetPlaylistsItemsRequest;
import se.michaelthelin.spotify.requests.data.tracks.GetAudioFeaturesForTrackRequest;


import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;
import se.michaelthelin.spotify.requests.data.tracks.GetAudioFeaturesForSeveralTracksRequest;
import se.michaelthelin.spotify.requests.data.users_profile.GetCurrentUsersProfileRequest;
import se.michaelthelin.spotify.model_objects.specification.User;

import java.io.IOException;
import java.net.URI;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;

import jakarta.servlet.http.HttpServletRequest;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;




@CrossOrigin(origins = "http://dataveras.net")
@RestController
@EnableWebMvc
@RequestMapping(value = "/api")


                                    // This controls/maps all calls to the Spotify API. The class contains the auth token in the SpotifyAPI object which allows user calls to the API.
public class AuthController {

    String code = "";
    final URI redirectURI = SpotifyHttpManager.makeUri("http://dataveras.net/authorize/");
    String TABLE_NAME = "AuthTokens";
   

    final Secret secret = new Secret("SpotifyAuth");
    public final SpotifyApi spotifyApi = new SpotifyApi.Builder()
    .setClientId(secret.getSecretValue("client_id"))
    .setClientSecret(secret.getSecretValue("client_secret"))
    .setRedirectUri(redirectURI)
    .build();

    
    @GetMapping(value = "login")
    @ResponseBody
    public ResponseEntity<String> spotifyLogin() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
        .scope("user-read-private, user-read-email, playlist-read-private, playlist-read-collaborative")
        .show_dialog(true)
        .build();
        HttpHeaders responseHeaders = new HttpHeaders();
        final URI uri = authorizationCodeUriRequest.execute();
        System.out.println(uri.toString());
        
        return new ResponseEntity<String>(uri.toString(),responseHeaders,HttpStatus.CREATED);

    }

    
    @CrossOrigin(origins = "http://dataveras.net")
    @GetMapping("authorize")
    public ResponseEntity<String> getSpotifyUserCode(@RequestParam("code") String userCode, @RequestParam("user") String userId, HttpServletRequest request) throws IOException {
        code = userCode;
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(userCode).build();
        HttpHeaders headers = new HttpHeaders();

        try {
            System.out.println("this is the user code "+ userCode);

            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
            System.out.println(authorizationCodeCredentials.getExpiresIn());
            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
            System.out.println("this is the token"+ spotifyApi.getAccessToken());

            String accessToken = spotifyApi.getAccessToken(); // Replace with the actual Spotify API access token

        
            final GetCurrentUsersProfileRequest getCurrentUsersProfileRequest = spotifyApi.getCurrentUsersProfile()
            .build();          
            
            final User user = getCurrentUsersProfileRequest.execute();

            System.out.println("user id: " + user.getId());
            
            
            
            DynamoClient dynamoClient = new DynamoClient();
            dynamoClient.PutToken(userId, accessToken);
            
            

        } catch (IOException | SpotifyWebApiException | org.apache.hc.core5.http.ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
       
        return new ResponseEntity<>(null,headers, HttpStatus.CREATED);
    }   

    
    @GetMapping(value = "user-playlists")
    public ResponseEntity<PlaylistSimplified[]> getUserPlaylists(HttpServletRequest request, @RequestParam("user") String userId) {
        DynamoClient dynamoClient = new DynamoClient();
        spotifyApi.setAccessToken(dynamoClient.GetToken(userId).get("token").toString());

        final GetListOfCurrentUsersPlaylistsRequest getListOfCurrentUsersPlaylistsRequest = spotifyApi.getListOfCurrentUsersPlaylists()
                .limit(10)
                .offset(0)
                .build();
        try {
            final Paging<PlaylistSimplified> playlistPaging = getListOfCurrentUsersPlaylistsRequest.execute();
            return new ResponseEntity<>(playlistPaging.getItems(), HttpStatus.FOUND);
        } catch (Exception e) {
            System.out.println("Something's wrong" + e.getMessage());
            System.out.println(spotifyApi.getAccessToken());
        }
        return new ResponseEntity<>(new PlaylistSimplified[0], HttpStatus.FOUND);
    }
    
    @GetMapping(value = "user-playlists/{id}")
    public PlaylistTrack[] getPlaylistTracks(@PathVariable String id, @RequestParam("user") String userId) {
        
        DynamoClient dynamoClient = new DynamoClient();
        spotifyApi.setAccessToken(dynamoClient.GetToken(userId).get("token").toString());

        final GetPlaylistsItemsRequest getPlaylistsItemsRequest = spotifyApi.getPlaylistsItems(id)
                .limit (100)
                .offset(0).build();

        try {
            final Paging<PlaylistTrack> tracksPaging = getPlaylistsItemsRequest.execute();
            return tracksPaging.getItems();
        } catch (Exception e) {
            System.out.println("Something's wrong" + e.getMessage());
        }
        return new PlaylistTrack[0];
    }
    

    @GetMapping(value = "user-playlists/{id}/stats")               
    public AudioFeatures[] getPlaylistStats(@PathVariable String id,  @RequestParam("user") String userId) {

        DynamoClient dynamoClient = new DynamoClient();
        spotifyApi.setAccessToken(dynamoClient.GetToken(userId).get("token").toString());
        
        PlaylistTrack[] items = getPlaylistTracks(id,userId);
       

        ArrayList<String> list = new ArrayList<String>(); 
        for (PlaylistTrack item : items) {
            if (items.length > 0) {    
                list.add(item.getTrack().getId());
            }
        }

        String[] ids = list.toArray(new String[0]);
        final GetAudioFeaturesForSeveralTracksRequest getAudioFeaturesForSeveralTracksRequest = spotifyApi
                .getAudioFeaturesForSeveralTracks(ids)
                .build(); 
        try {
            final AudioFeatures[] audioFeatures = getAudioFeaturesForSeveralTracksRequest.execute();
            return audioFeatures;
        } catch (Exception e) {
            System.out.println("Something's wrong" + e.getMessage());
        }
        return new AudioFeatures[0];
    }

    @GetMapping(value = "user-playlists/{id}/{id2}")
    public HashMap<String, Object> getTrackStats(@PathVariable String id, @PathVariable String id2,  @RequestParam("user") String userId) {                   //implemented witha  hash map so that we can carry name and artist fields from the playlistInfo into the trackStats section
    
        DynamoClient dynamoClient = new DynamoClient();
        spotifyApi.setAccessToken(dynamoClient.GetToken(userId).get("token").toString());

        final GetAudioFeaturesForTrackRequest getAudioFeaturesForTrackRequest = spotifyApi.getAudioFeaturesForTrack(id2).build();

        try {
            final AudioFeatures audioFeatures = getAudioFeaturesForTrackRequest.execute();              
            final Track track = spotifyApi.getTrack(id2).build().execute();
            // console.log(track.getName());
            HashMap<String, Object> result = new HashMap<>();
            result.put("artists", track.getArtists());
            result.put("name", track.getName());
            result.put("pic", track.getAlbum().getImages()[0]);
            result.put("acousticness", audioFeatures.getAcousticness());
            result.put("danceability", audioFeatures.getDanceability());
            result.put("energy", audioFeatures.getEnergy());
            result.put("instrumentalness", audioFeatures.getInstrumentalness());
            result.put("liveness", audioFeatures.getLiveness());
            result.put("loudness", audioFeatures.getLoudness());
            result.put("speechiness", audioFeatures.getSpeechiness());
            result.put("tempo", audioFeatures.getTempo());
            result.put("valence", audioFeatures.getValence());
            
            return result;
        } catch (Exception e) {
            System.out.println("Something's wrong" + e.getMessage());
        }
        return new HashMap<>();
    }


}






