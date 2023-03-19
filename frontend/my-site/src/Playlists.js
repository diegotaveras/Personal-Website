import React from "react";

import axios from "axios";
import {useState, useEffect} from "react";

export default function Playlists() {
    const  [userPlaylists, setUserPlaylists] = useState();
  
    useEffect(() => {
      fetch("http://35.162.152.30:8000/api/user-playlists")
      .then(response => response.json())
      .then(data=> {
        console.log(data)
        setUserPlaylists(data)
      })
    }, [])
    

    return (
        <div className="playlists">
            {userPlaylists ? (
                userPlaylists.map((playlistsResult) => {
                    const url = `http://35.162.152.30:8000/user-playlists/${playlistsResult.id}`;
                    return <li key= {playlistsResult.id}> <a href = {url}> {playlistsResult.name}</a></li>
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