import React from "react";
import diego from "./images/diego.JPG";
import resume from "./resources/Diego-Taveras-Resume.pdf";
import i from "./images/i.png"

export default function Home() {
    return <div className="home">

        <h1>Hi! My name is Diego Taveras and I'm a Puertorican Computer Science student studying at UIUC. </h1>
        <img src={diego} height="500px" alt="Github"></img>
        <div className="info">
        
            <p>{"{ Major: Computer Science,"} <br/> 
            
                {"Degree: Bachelor of Science, "} <br/> 
            
                {"School: Grainger School of Engineering, "}<br/> 
            
                
            
                {"Resume:  "} <a href={resume}><nobr>Here!</nobr></a>
                
                { " }"}
                


                
            

            </p>
        
        </div>
        <div className="image">
            <img src={i} height="350px"></img>
        </div>
        
    </div>;
}