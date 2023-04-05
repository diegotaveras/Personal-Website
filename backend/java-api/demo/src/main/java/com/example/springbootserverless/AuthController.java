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
import se.michaelthelin.spotify.model_objects.specification.Episode;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.PlaylistTrack;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.playlists.GetPlaylistsItemsRequest;
import se.michaelthelin.spotify.requests.data.tracks.GetAudioFeaturesForTrackRequest;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;
import se.michaelthelin.spotify.requests.data.tracks.GetAudioFeaturesForSeveralTracksRequest;

// import se.michaelthelin.spotify.requests.data.playlists.GetPlaylistsItems;

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
import org.springframework.web.bind.annotation.PathVariable;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestHeader;



import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;







// @CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api")

                                    // This controls/maps all calls to the Spotify API. The class contains the auth token in the SpotifyAPI object which allows user calls to the API.
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
        System.out.println(uri.toString());
        return uri.toString();

    }
    @CrossOrigin(origins = "http://localhost:3000")
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

    
    @GetMapping(value = "user-playlists/{id}")
    public PlaylistTrack[] getPlaylistTracks(@PathVariable String id) {

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
    public AudioFeatures[] getPlaylistStats(@PathVariable String id) {

        PlaylistTrack[] items = getPlaylistTracks(id);
       

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
    public HashMap<String, Object> getTrackStats(@PathVariable String id, @PathVariable String id2) {                   //implemented witha  hash map so that we can carry name and artist fields from the playlistInfo into the trackStats section
    final GetAudioFeaturesForTrackRequest getAudioFeaturesForTrackRequest = spotifyApi.getAudioFeaturesForTrack(id2).build();

    try {
        final AudioFeatures audioFeatures = getAudioFeaturesForTrackRequest.execute();              
        final Track track = spotifyApi.getTrack(id2).build().execute();
        // console.log(track.getName());
        HashMap<String, Object> result = new HashMap<>();
        result.put("artists", track.getArtists());
        result.put("name", track.getName());
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






