
import './App.scss';
import NavBar from './NavBar';
import React from 'react';
import { Route, Routes} from "react-router-dom"
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Playlists from './Playlists';
import PlaylistInfo from './PlaylistInfo';
import TrackStats from './TrackStats';
import Authorize from './Authorize';

function App() {
  
  

  return (
    <>
    <div className='app'>
      <NavBar/>
      <Routes>
        <Route path = "/projects" element= {<Projects/>}/>
        <Route path = "/contact" element= {<Contact/>}/>
        <Route path = "/authorize" element= {<Authorize/>}/>
        <Route path = "/user-playlists" element= {<Playlists/>}/>
        <Route path = "/user-playlists/:id" element= {<PlaylistInfo/>}/>
        <Route path = "/user-playlists/:id/:id2" element= {<TrackStats/>}/>
        <Route path = "/" element={<Home/>}/>
      </Routes>
    </div>
    </>

  )
}

export default App;
