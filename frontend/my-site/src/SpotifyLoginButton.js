import React, { useState } from "react";

function SpotifyLoginButton() {
  const [code, setCode] = useState("");

  function handleSpotifyLogin() {
    // Define the Spotify authorization URL with necessary query parameters
    const scopes = ["user-read-private", "user-read-email", "user-top-read"];
    const clientId = "01a5a5acf2c241f2aa7f38695368c12c";
    const redirectUri = "http://localhost:3000/api/get-user-code/";
    const showDialog = true;
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&show_dialog=${showDialog}`;

    // Navigate to the Spotify authorization URL
    window.location = url;
  }

  return (
    <div>
      <button onClick={handleSpotifyLogin}>Log in with Spotify</button>
      
    </div>
  );
}

export default SpotifyLoginButton;