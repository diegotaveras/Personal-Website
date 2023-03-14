
import './App.css';
import NavBar from './NavBar';
import React from 'react';
import { Route, Routes} from "react-router-dom"
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Playlists from './Playlists';

function App() {



  return (
    <>
    <NavBar/>
    <div className='container'>

    
      <Routes>
        <Route path = "/projects" element= {<Projects/>}/>
      </Routes>
      <Routes>
        <Route path = "/contact" element= {<Contact/>}/>
      </Routes>
      <Routes>
        <Route path = "/user-playlists" element= {<Playlists/>}/>
      </Routes>
      <Routes>
        <Route path = "/" element={<Home/>}/>
      </Routes>
    </div>
  </>
  )
}

export default App;
