import React from "react";

import axios from "axios";
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom"
import Authorize from "./Authorize";

export default function Playlists() {
    const  [userPlaylists, setUserPlaylists] = useState();

    
    // const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   };
    // https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod
    useEffect(() => {
      fetch("http://localhost:8000/api/user-playlists/?user=" + localStorage.getItem("user_id"))
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
                    const url = `http://localhost:3000/user-playlists/${playlistsResult.id}`;
                    return <li key= {playlistsResult.id}> <a href = {url}> {playlistsResult.name}</a></li>
                })
            ):
            (
               "loading"
            )}
        </div>
    );
}