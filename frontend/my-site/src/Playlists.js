import React from "react";

import axios from "axios";
import {useState, useEffect} from "react";

export default function Playlists() {
    const  [userPlaylists, setUserPlaylists] = useState();
  
    useEffect(() => {
      fetch("http://localhost:8000/api/user-playlists")
      .then(response => response.json())
      .then(data=> {
        console.log(data)
        setUserPlaylists(data)
      })
    }, [])
    

    return (
        <div>
            {userPlaylists ? (
                userPlaylists.map((playlistsResult) => {
                    const url = `https://api.spotify.com/v1/playlists/${playlistsResult.id}`;
                    return <li key= {playlistsResult.name}> <a href = {url}> {playlistsResult.name}</a></li>
                })
            ):
            (
                <h1>
                    Loading...
                </h1>
            )}
        </div>
    );
}