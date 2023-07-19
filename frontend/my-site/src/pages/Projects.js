import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";





const getSpotifyUserLogin = async () => {
  // https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod
  try {
    const response = (await axios.get("https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod/api/login"));
    const url = response.data;
    console.log(url)
    window.location.href = url;
  } catch (error) {
    console.error(error);
  }
}





export default function Projects() {
  
  return (
  <div className="projects">
    <div className="project-card">
  <div className="project-description">
    <h2>Welcome to my Spotify Playlist Analyzer, made possible by Spotify Web API!</h2>
  </div>
  <div className="project-buttons">
    <button onClick={getSpotifyUserLogin} >
      Sign In
    </button>
  </div>
  <div className="project-description">
    <h1>This app allows you to sign in to your Spotify account using the Oauth2.0 authorization flow. 
      You will be able to view your playlists and the average audio features of each of your playlists, as well as the individual values for each song. 
      Audio features are a set of values that are used for recommendation and curation purposes by Spotify. 
      Viewing them may give you an insight into the overall emotions, energy, and vibes that you convey through your playlists! </h1>
  </div>
  <div className="project-description">
    <h1> More updates to this app are coming soon! </h1>
  </div>
</div>
</div>
  );
}



