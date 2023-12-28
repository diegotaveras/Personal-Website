import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import github_logo from '../images/github-mark.svg';
import project_data from '../data/project-data.json';



const getSpotifyUserLogin = async () => {
  // https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod
  try {
    const response = (await axios.get("https://esefee855k.execute-api.us-east-1.amazonaws.com/Prod/api/login"));
    const url = response.data;
    console.log(url)
    window.location.href = url;
  } catch (error) {
    console.error(error);
  }
}





export default function Projects() {


  return (
  <div className="projects">
    {project_data.map((project) => {
      return (
      <div className="project-card">
      <div className="project-description">
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h2 style={{textAlign:"left"}}>{project.title} </h2>
         
            <a href={project.github_link} target="_blank" rel="noopener noreferrer">
              <img style={{marginTop:"1.3em"}} className="icons" src={github_logo} height="30px" alt="Github"></img>
            </a>
          
        </div>
      </div>
      <div className="project-buttons">
        <button onClick={getSpotifyUserLogin} >
          Sign In
        </button>
      </div>
      <div className="project-description">
        <h1> {project.description} </h1>
        
      </div>
    </div>
    )
    }

    )}
    
</div>
  );
}



