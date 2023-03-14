import React from "react";
import SpotifyLoginButton from "../SpotifyLoginButton";
import axios from "axios";
import {useState, useEffect} from "react";









// export default function Projects() {
//   return (
//     <div className="project">
//       <h1>Welcome to my Spotify playlist analyzer, made possible by Spotify Web API!</h1>

//       <div className="sign-in">
//         <SpotifyLoginButton />
//       </div>
//     </div>
//   );


const getSpotifyUserLogin = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/login");
    const url = response.data;
    window.location.href = url;
  } catch (error) {
    console.error(error);
  }
}

export default function Projects() {
  // const getSpotifyUserLogin = () => {
  //   // Replace the URL with your actual endpoint
  //   const scopes = ["user-read-private", "user-read-email", "user-top-read"];
  //   const clientId = "01a5a5acf2c241f2aa7f38695368c12c";
  //   const redirectUri = "http://localhost:8000/api/get-user-code/";
  //   const showDialog = true;
  //   const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&show_dialog=${showDialog}`;
  //   window.location.href = url;
  // };
  
  return (
    <div className="project">
      <h1>
        Welcome to my Spotify playlist analyzer, made possible by Spotify Web API!
      </h1>

      <div className="sign-in">
        <button onClick={getSpotifyUserLogin} className="sign-in-btn">
          Sign In
        </button>
      </div>
    </div>
  );
}



