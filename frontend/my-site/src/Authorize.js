import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {useLocation, Link, Navigate} from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'


export default function Authorize() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    console.log("testing" + code)
    const [userCode, setUserCode] = useState(null);
    const [redirectHeaders, setRedirectHeaders] = useState(null);
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      const uuid = uuidv4();
      localStorage.setItem("user_id", uuid);
    }
    useEffect(() => {
      fetch("https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod/api/authorize/?code=" + code + "&user=" + localStorage.getItem("user_id"))
        .then(response => {
        //     console.log(response);
        //   const headers = response.headers;
        //     console.log(headers.get("Authorization"))
       
          setUserCode(code)
          setRedirectHeaders(response.headers)
          console.log("headers be like:"+  JSON.stringify(response.headers))
    
        return response.json();
    })
        .then(data => {
          console.log(data);
          setUserCode(data);
        })
        .catch(error => {
        });
    }, []);
    
    if (userCode && redirectHeaders) {
        console.log("lolll " + JSON.stringify(redirectHeaders))
      return (
        <Navigate to={{ 
            pathname: "/user-playlists", 
            state: { token: redirectHeaders.get("Authorization") } 
            
           }}>
            Register
        </Navigate>
        
      );
    }
    
    return <div>Loading...</div>;
}