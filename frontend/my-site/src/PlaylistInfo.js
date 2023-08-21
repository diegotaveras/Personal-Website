import { useParams } from 'react-router-dom';
import React from "react";

import axios from "axios";
import {useState, useEffect, useRef} from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import "./PlaylistInfo.css"
import PopUp from './PopUp';
import { Radar, Chart} from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);




export default function PlaylistInfo() {
    const [playlistInfo, setPlaylistInfo] = useState();
    const [qualMap, setQualMap] = useState({});

    
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
      
    // getting only the qualitative attributes to use on the radar graph
    const qualMap = new Map();
    for (const [key, value] of Object.entries(updatedAverages)) {
      if (key !== 'tempo' && key !== "loudness") {
        const qualValue = value;
        qualMap.set(key, qualValue);
      }
    }

    const qualObject = Object.fromEntries(qualMap);

    
    setQualMap(qualObject);
    
    
  }
}, [playlistInfo, stats]);

var data = {
  labels: ["Acousticness", "Danceability", "Energy", "Valence", "Instrumentalness", "Liveness", "Speechiness"],
  datasets: [{
    label: 'Value',
    data: [qualMap["acousticness"], qualMap["danceability"], qualMap["energy"], qualMap["valence"], qualMap["instrumentalness"],qualMap["liveness"], qualMap["speechiness"]],
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
  }]
};

var options = {
  scales: {
    r: {
      grid: {
        color: "grey"
      },
      ticks: {
        display: false,
        backdropColor: "transparent"
      }
      
    }
  }
};

const plugin = {

  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};
  
  return (
    <>
    <div className='playlist-intro'> {console.log(playlistInfo)}</div>

    
    <div className="playlists-info">

      
      <ul className="track-list">
        
          {playlistInfo ? (
              playlistInfo.map((tracksResult) => {
                  const url = `${id}/${tracksResult.track.id}`;
                  return (
                      <li className="track-card" key= {tracksResult.track.id}> 
                      <a href = {url}>
                        <img src={tracksResult ? tracksResult.track.album.images[0].url : ""}></img> 
                        <div className="track-details">
                          {tracksResult.track.name}
                          <br/>
                          <div className='artist-name'>{tracksResult.track.artists[0].name}</div>
                        </div>
                        </a>
                      </li> ) 
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
        <Radar  style={{display:"inline", height:"20rem", width:"20rem"}} options={options} data={data}/>
        
        <ul>
          
          <li>
          <PopUp
            showPopUp={openedPopUpIndex === 0}
            togglePopUp={() => togglePopUp(0)}
            desc="The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks.  Values typical range between -60 and 0 db."
          >
            Loudness: {averages["loudness"].toFixed(2)}
          </PopUp>
          </li>

          <li>
            <PopUp
              showPopUp={openedPopUpIndex === 1}
              togglePopUp={() => togglePopUp(1)}
              desc="A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic."
            >
              Acousticness: {averages["acousticness"].toFixed(2)}
            </PopUp>
          </li>
          <li>
            <PopUp
              showPopUp={openedPopUpIndex === 2}
              togglePopUp={() => togglePopUp(2)}
              desc="Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable."
            >
              Danceability: {averages["danceability"].toFixed(2)}
            </PopUp>
          </li>
          <li>
            <PopUp
              showPopUp={openedPopUpIndex === 3}
              togglePopUp={() => togglePopUp(3)}
              desc="Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy."
            >
              Energy: {averages["energy"].toFixed(2)}
            </PopUp>
          </li>
          <li>
            <PopUp
              showPopUp={openedPopUpIndex === 4}
              togglePopUp={() => togglePopUp(4)}
              desc="A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."
            >
              Valence: {averages["valence"].toFixed(2)}
            </PopUp>
          </li>
          <li>
            <PopUp
              showPopUp={openedPopUpIndex === 5}
              togglePopUp={() => togglePopUp(5)}
              desc="The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration."
            >
              Tempo: {averages["tempo"].toFixed(2)}
            </PopUp>
          </li>
          <li>
            <PopUp
              showPopUp={openedPopUpIndex === 6}
              togglePopUp={() => togglePopUp(6)}
              desc="Predicts whether a track contains no vocals. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content."
            >
              Instrumentalness: {averages["instrumentalness"].toFixed(2)}
            </PopUp>
          </li>
          <li>
            <PopUp
              showPopUp={openedPopUpIndex === 7}
              togglePopUp={() => togglePopUp(7)}
              desc="Detects the presence of an audience in the recording with a range from 0.0 to 1.0. Higher liveness values represent an increased probability that the track was performed live."
            >
              Liveness: {averages["liveness"].toFixed(2)}
            </PopUp>
          </li>
          <li>
            <PopUp
              showPopUp={openedPopUpIndex === 9}
              togglePopUp={() => togglePopUp(9)}
              desc="Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value."
            >
              Speechiness: {averages["speechiness"].toFixed(2)}
            </PopUp>
          </li>
        </ul>
          
      </div>
      
  </div>
  </>
  )
}