import { useParams } from 'react-router-dom';
import React from "react";

import axios from "axios";
import {useState, useEffect} from "react";

import "./PlaylistInfo.css"
import PopUp from './PopUp';

export default function PlaylistInfo() {
    const [playlistInfo, setPlaylistInfo] = useState();
    const [averageLoud, setAverageLoud] = useState(0.0);
    // const [averages, setAverages] = useState({});
    
    const {id} = useParams();
    useEffect(() => {
      fetch(`https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod/api/user-playlists/${id}` + "/?user=" + localStorage.getItem("user_id"))
      .then(response => response.json())
      .then(data=> {
        console.log(data)
        setPlaylistInfo(data)
    
    });
      
    }, [])
    

  const [stats, setStats] = useState([]);
  const [mousePos, setMousePos] = useState({});
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);

  const [showPopUp, setShowPopUp] = useState(false);

  const [openedPopUpIndex, setOpenedPopUpIndex] = useState(-1); // Initialize to -1 (no pop-up open)


  const togglePopUp = (index) => {
    setOpenedPopUpIndex((prevState) => (prevState === index ? -1 : index));
  };

    
  // https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod
  useEffect(() => {
      fetch(`https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod/api/user-playlists/${id}/stats` + "/?user=" + localStorage.getItem("user_id"))
      .then(response => response.json())
      .then(data=> {
        console.log(data)
        setStats(data)
          
      });

  }, [])

//    console.log(updated);
const [averages, setAverages] = useState({
    loudness: 0.0,
    danceability: 0.0,
    energy: 0.0,
    valence: 0.0,
    instrumentalness: 0.0,
    tempo: 0.0,
    liveness: 0.0,
    acousticness: 0.0,
    speechiness: 0.0,
  });
  

  useEffect(() => {
    if (playlistInfo && playlistInfo.length > 0) {
      let updatedAverages = { ...averages };
      for (const key of Object.keys(updatedAverages)) {
        let sum = 0.0;
        for (let k = 0; k < stats.length; k++) {
          sum += stats[k][key];
        }
        updatedAverages[key] = sum / stats.length;
      }
      setAverages(updatedAverages);
    }
  }, [playlistInfo, stats]);
  
    

  return (
    <div className="playlists-info">
      
      <ul className="track-list">
        
          
          {playlistInfo ? (
              playlistInfo.map((tracksResult) => {
                  const url = `${id}/${tracksResult.track.id}`;
                  return <a href = {url}> <li className="track-card" key= {tracksResult.track.id}> <img src={tracksResult ? tracksResult.track.album.images[0].url : ""}></img> <p>{tracksResult.track.name} <body>{tracksResult.track.artists[0].name}</body> </p> </li> </a>
              })
          ):
          (
              <h1>
                  Loading...
              </h1>
          )}
      </ul>
      <div className="playlist-averages">
        <h1> Playlist Averages:</h1>

        <h2 className="">
        <PopUp
          showPopUp={openedPopUpIndex === 0}
          togglePopUp={() => togglePopUp(0)}
          coords={mousePos}
          desc="The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks.  Values typical range between -60 and 0 db."
        >
          Loudness: {averages["loudness"].toFixed(2)}
        </PopUp>
        </h2>

        <h2>
          <PopUp
            showPopUp={openedPopUpIndex === 1}
            togglePopUp={() => togglePopUp(1)}
            coords={mousePos}
            desc="A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic."
          >
            Acousticness: {averages["acousticness"].toFixed(2)}
          </PopUp>
        </h2>
        <h2>
          <PopUp
            showPopUp={openedPopUpIndex === 2}
            togglePopUp={() => togglePopUp(2)}
            coords={mousePos}
            desc="Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable."
          >
            Danceability: {averages["danceability"].toFixed(2)}
          </PopUp>
        </h2>
        <h2>
          <PopUp
            showPopUp={openedPopUpIndex === 3}
            togglePopUp={() => togglePopUp(3)}
            coords={mousePos}
            desc="Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy."
          >
            Energy: {averages["energy"].toFixed(2)}
          </PopUp>
        </h2>
        <h2>
          <PopUp
            showPopUp={openedPopUpIndex === 4}
            togglePopUp={() => togglePopUp(4)}
            coords={mousePos}
            desc="A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."
          >
            Valence: {averages["valence"].toFixed(2)}
          </PopUp>
        </h2>
        <h2>
          <PopUp
            showPopUp={openedPopUpIndex === 5}
            togglePopUp={() => togglePopUp(5)}
            coords={mousePos}
            desc="The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration."
          >
            Tempo: {averages["tempo"].toFixed(2)}
          </PopUp>
        </h2>
        <h2>
          <PopUp
            showPopUp={openedPopUpIndex === 6}
            togglePopUp={() => togglePopUp(6)}
            coords={mousePos}
            desc="Predicts whether a track contains no vocals. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content."
          >
            Instrumentalness: {averages["instrumentalness"].toFixed(2)}
          </PopUp>
        </h2>
        <h2>
          <PopUp
            showPopUp={openedPopUpIndex === 7}
            togglePopUp={() => togglePopUp(7)}
            coords={mousePos}
            desc="Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live."
          >
            Liveness: {averages["liveness"].toFixed(2)}
          </PopUp>
        </h2>
        <h2>
          <PopUp
            showPopUp={openedPopUpIndex === 8}
            togglePopUp={() => togglePopUp(8)}
            coords={mousePos}
            desc="A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic."
          >
            Acousticness: {averages["acousticness"].toFixed(2)}
          </PopUp>
        </h2>
        <h2>
          <PopUp
            showPopUp={openedPopUpIndex === 9}
            togglePopUp={() => togglePopUp(9)}
            coords={mousePos}
            desc="Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value."
          >
            Speechiness: {averages["speechiness"].toFixed(2)}
          </PopUp>
        </h2>

          
      </div>
  </div>
  )
}