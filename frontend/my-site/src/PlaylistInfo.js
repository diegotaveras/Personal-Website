// import React from "react";
import { useParams } from 'react-router-dom';
// import axios from "axios";
// import {useState, useEffect} from "react";

// export default function PlaylistInfo() {
//     const [playlistInfo, setPlaylistInfo] = useState();
//     const [averages, setAverages] = useState({});
//     const [loudData, setLoudData] = useState([]);

  
//     const {id} = useParams();
//     const {id2} = useParams();
//     useEffect(() => {
//       fetch(`http://localhost:8000/api/user-playlists/${id}`)
//       .then(response => response.json())
//       .then(data=> {
//         console.log(data)
//         setPlaylistInfo(data)
   
//     });
      
//     }, [])

    
   

//     return (
//         <div className="playlist-container">
//             <div className="playlist-averages">
//             <h1>Averages:</h1>
//             <h2>Loudness: {averageLoud.toFixed(2)}</h2>
//             <h2>Danceability: {averageLoud.toFixed(2)}</h2>
//             <h2>Energy: {averageLoud.toFixed(2)}</h2>
//             <h2>Valence: {averageLoud.toFixed(2)}</h2>
//             <h2>Tempo: {averageLoud.toFixed(2)}</h2>
//             <h2>Instrumentalness: {averageLoud.toFixed(2)}</h2>
//             <h2>Liveness: {averageLoud.toFixed(2)}</h2>
//             <h2>Acousticness: {averageLoud.toFixed(2)}</h2>
//             <h2>Speechiness: {averageLoud.toFixed(2)}</h2>



//             {playlistInfo ? (
//                     playlistInfo.map((playlistsResult) => {
//                         const url = `http://localhost:3000/user-playlists/${id}/${playlistsResult.track.id}`;
                        
//                         // return <li key= {playlistsResult.track.id}> <a href = {url}> {playlistsResult.track.loudness}</a></li>
//                     })
//                 ):
//                 (
//                     <h1>
//                         Loading...
//                     </h1>
//                 )}
                
//             </div>
//             <div className="playlists">
                
//                 {playlistInfo ? (
//                     playlistInfo.map((playlistsResult) => {
//                         const url = `http://localhost:3000/user-playlists/${id}/${playlistsResult.track.id}`;
//                         return <li key= {playlistsResult.track.id}> <a href = {url}> {playlistsResult.track.name}</a></li>
//                     })
//                 ):
//                 (
//                     <h1>
//                         Loading...
//                     </h1>
//                 )}
//             </div>
//         </div>
//     );
// }
import React from "react";

import axios from "axios";
import {useState, useEffect} from "react";

export default function PlaylistInfo() {
    const [playlistInfo, setPlaylistInfo] = useState();
    const [averageLoud, setAverageLoud] = useState(0.0);
    // const [averages, setAverages] = useState({});
    
    const {id} = useParams();
        const {id2} = useParams();
        useEffect(() => {
          fetch(`http://localhost:8000/api/user-playlists/${id}` + "/?user=" + localStorage.getItem("user_id"))
          .then(response => response.json())
          .then(data=> {
            console.log(data)
            setPlaylistInfo(data)
       
        });
          
        }, [])
    

    const [stats, setStats] = useState([]);


    
    // https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod
    useEffect(() => {
        fetch(`http://localhost:8000/api/user-playlists/${id}/stats` + "/?user=" + localStorage.getItem("user_id"))
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
        <div className="playlist-container">
            <div className="playlist-averages">
            <h1>Averages:</h1>
            <h2>Loudness: {averages["loudness"].toFixed(2)}</h2>
            <h2>Danceability: {averages["danceability"].toFixed(2)}</h2>
            <h2>Energy: {averages["energy"].toFixed(2)}</h2>
            <h2>Valence: {averages["valence"].toFixed(2)}</h2>
            <h2>Tempo: {averages["tempo"].toFixed(2)}</h2>
            <h2>Instrumentalness: {averages["instrumentalness"].toFixed(2)}</h2>
            <h2>Liveness: {averages["liveness"].toFixed(2)}</h2>
            <h2>Acousticness: {averages["acousticness"].toFixed(2)}</h2>
            <h2>Speechiness: {averages["speechiness"].toFixed(2)}</h2>



            {playlistInfo ? (
                    playlistInfo.map((playlistsResult) => {
                        const url = `http://localhost:3000/user-playlists/${id}/${playlistsResult.track.id}`;
                        
                        // return <li key= {playlistsResult.track.id}> <a href = {url}> {playlistsResult.track.loudness}</a></li>
                    })
                ):
                (
                    <h1>
                        Loading...
                    </h1>
                )}
                
            </div>
            <div className="playlists">
                
                {playlistInfo ? (
                    playlistInfo.map((playlistsResult) => {
                        const url = `http://localhost:3000/user-playlists/${id}/${playlistsResult.track.id}`;
                        return <li key= {playlistsResult.track.id}> <a href = {url}> {playlistsResult.track.name}</a></li>
                    })
                ):
                (
                    <h1>
                        Loading...
                    </h1>
                )}
            </div>
        </div>
      )
}