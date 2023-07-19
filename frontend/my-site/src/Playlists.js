import React from "react";

import axios from "axios";
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom"
import Authorize from "./Authorize";
import "./Playlists.css"


export default function Playlists() {
    const  [userPlaylists, setUserPlaylists] = useState();

    
    useEffect(() => {
      fetch("https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod/api/user-playlists/?user=" + localStorage.getItem("user_id"))
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
                    const url = `user-playlists/${playlistsResult.id}`;
                    return <li key= {playlistsResult.id}> <a href = {url}> {playlistsResult.name}</a></li>
                })
            ):
            (
               "loading"
            )}
        </div>
    );
}