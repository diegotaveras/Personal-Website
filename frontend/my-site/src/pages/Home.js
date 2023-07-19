import React from "react";
import diego from "../images/diego.JPG";
// import resume from "./resources/Diego-Taveras-Resume.pdf";
import i from "../images/i.png"


export default function Home() {
    return (
      <div className="home">

        <div className="intro">
            <img src={diego} height="500px" alt="Diego" className="diego-image" width="400px" />
            <div className="intro-text">
                <h1 className="">
                    Hi! I'm a junior 
                    studying Computer Science <br/>at the University of Illinois at Urbana-Champaign <span className="uiuc">(UIUC)</span>
                </h1>
                <h1>
                    I am from Puerto Rico.
                </h1>
                <h1 className="">My main interests are full-stack software development, cybersecurity, and machine learning.
                </h1>
                <h1 className=""> As hobbies, I enjoy exercising, listening to music, and playing videogames.
                </h1>
                <h1 className=""> Check the <span className="projects-text"> <a href="/projects">Projects</a> </span>tab to learn more about my projects!
                </h1>
            </div>
                
            </div>
        
      
        
  
  
        {/* <img src={i} height="350px" alt="Profile" /> */}
        <div className="tech"> 
        </div>
      </div>
      
    );
  }
  