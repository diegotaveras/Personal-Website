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
            <div className="playlists-list">

                
                    {userPlaylists ? (
                        userPlaylists.map((playlistsResult) => {
                            const url = `user-playlists/${playlistsResult.id}`;
                            return <a href = {url}> <li className="playlist-card" key= {playlistsResult.id}>{playlistsResult ?  <img src={playlistsResult.images[0] ? playlistsResult.images[0].url : "" } /> : <img src=""></img>} <p>{playlistsResult.name}<body>{playlistsResult.owner.displayName}</body></p></li> </a>
                        })
                    ):
                    (
                    "loading"
                    )}
                
            </div>
        </div>
    );
}