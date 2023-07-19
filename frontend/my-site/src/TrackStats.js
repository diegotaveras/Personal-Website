import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {useState, useEffect} from "react";
import "./TrackStats.css"
import PopUp from "./PopUp";

export default function TrackStats() {

  
    const [trackStats, setTrackStats] = useState();
    // https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod
    const { id, id2 } = useParams();
    useEffect(() => {
      fetch(`https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod/api/user-playlists/${id}/${id2}`+ "/?user=" + localStorage.getItem("user_id"))
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTrackStats(data);
        });
    }, []);


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

    const [openedPopUpIndex, setOpenedPopUpIndex] = useState(-1); 

  
    const togglePopUp = (index) => {
      setOpenedPopUpIndex((prevState) => (prevState === index ? -1 : index));
    };

    return (
      <div className="trackStats">
        <div className="">

        </div>
        <div className="track-pic">
          {trackStats ?  <img src={trackStats.pic.url} width="300px" height="300px"/> : <img src=""></img>}

        </div>
        <div className="track-info">
            <h1> {trackStats ? "Track: " + (trackStats.name) : ("none") } </h1>
            <h2> {trackStats ? "Artist: " + (trackStats.artists[0].name) : ("none") } </h2>
        </div>
        {trackStats ? (
          <div>

            <ul>
              <li> <PopUp showPopUp={openedPopUpIndex == 0} togglePopUp={() => togglePopUp(0)} coords={mousePos} desc= "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic."> Acousticness: {trackStats.acousticness}</PopUp> </li>
              <li> <PopUp showPopUp={openedPopUpIndex == 1} togglePopUp={() => togglePopUp(1)} coords={mousePos} desc= "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable."> Danceability: {trackStats.danceability}</PopUp> </li>
              <li> <PopUp showPopUp={openedPopUpIndex == 2} togglePopUp={() => togglePopUp(2)} coords={mousePos} desc= "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy."> Energy: {trackStats.energy}</PopUp> </li>
              <li> <PopUp showPopUp={openedPopUpIndex == 3} togglePopUp={() => togglePopUp(3)} coords={mousePos} desc= "Predicts whether a track contains no vocals. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content."> Instrumentalness: {trackStats.instrumentalness}</PopUp> </li>
              <li> <PopUp showPopUp={openedPopUpIndex == 4} togglePopUp={() => togglePopUp(4)} coords={mousePos} desc= "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live."> Liveness: {trackStats.liveness}</PopUp> </li>
              <li> <PopUp showPopUp={openedPopUpIndex == 5} togglePopUp={() => togglePopUp(5)} coords={mousePos} desc= "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks.  Values typical range between -60 and 0 db."> Loudness: {trackStats.loudness}</PopUp> </li>
              <li> <PopUp showPopUp={openedPopUpIndex == 6} togglePopUp={() => togglePopUp(6)} coords={mousePos} desc= "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value."> Speechiness: {trackStats.speechiness}</PopUp> </li>
              <li> <PopUp showPopUp={openedPopUpIndex == 7} togglePopUp={() => togglePopUp(7)} coords={mousePos} desc= "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."> Valence: {trackStats.valence}</PopUp> </li>
              <li> <PopUp showPopUp={openedPopUpIndex == 8} togglePopUp={() => togglePopUp(8)} coords={mousePos} desc= "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration."> Tempo: {trackStats.tempo}</PopUp> </li>
            </ul>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
  