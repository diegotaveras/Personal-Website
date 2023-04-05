import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";





const getSpotifyUserLogin = async () => {
  // http://localhost:8000
  // http://ec2-34-218-50-216.us-west-2.compute.amazonaws.com:8000
  // 54.201.222.75:8000
  try {
    const response = await axios.get("http://54.201.222.75:8000/api/login");
    // response.header("Access-Control-Allow-Origin", "*");
    const url = response.data;
    window.location.href = url;
  } catch (error) {
    console.error(error);
  }
}


// const getSpotifyUserLogin = async () => {
//   try {
//     const response = await fetch("http://ec2-54-187-60-185.us-west-2.compute.amazonaws.com:8000/api/login", {
//       method: 'GET',
//       mode: 'no-cors',
//       headers:{
//         "Access-Control-Allow-Headers" : "Content-Type",
//         "Access-Control-Allow-Origin": "https://localhost:3000",
//         "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
//       }
//     })
//     const url = await response.json();
//     window.location.href = url;
//   } catch (error) {
//     console.error(error);
//   }
// }


export default function Projects() {
  
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



