import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {useState, useEffect} from "react";

import trackStats from './App.css'

export default function TrackStats() {
    const [trackStats, setTrackStats] = useState();
  
    const { id, id2 } = useParams();
    useEffect(() => {
      fetch(`http://localhost:8000/api/user-playlists/${id}/${id2}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTrackStats(data);
        });
    }, []);

    const url = trackStats ? (trackStats.trackHref): ("ni");
    console.log(url);
  
    return (
      <div className="trackStats">
        <div>
            <h1> {trackStats ? "Track: " + (trackStats.name) : ("none") } </h1>
            <h2> {trackStats ? "Artist: " + (trackStats.artists[0].name) : ("none") } </h2>
        </div>
        {trackStats ? (
            <div>

          <ul>
            <li>Acousticness: {trackStats.acousticness}</li>
            <li>Danceability: {trackStats.danceability}</li>
            <li>Energy: {trackStats.energy}</li>
            <li>Instrumentalness: {trackStats.instrumentalness}</li>
            <li>Liveness: {trackStats.liveness}</li>
            <li>Loudness: {trackStats.loudness}</li>
            <li>Speechiness: {trackStats.speechiness}</li>
            <li>Tempo: {trackStats.tempo}</li>
            <li>Valence: {trackStats.valence}</li>
          </ul>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
  