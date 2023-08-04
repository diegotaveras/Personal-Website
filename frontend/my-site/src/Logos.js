import React from "react";
import diego from "./images/diego.JPG";
// import resume from "./resources/Diego-Taveras-Resume.pdf";
import i from "./images/i.png"
import arrow from "./images/arrow.png"
import { useEffect } from "react";



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



export default function Logos(props) {
  
    const generateRandomStyle = () => {
        let randomTop = `${((getRandomInt(props.max_height - 100) + 100)/props.max_width) * 100}%`;
        let randomLeft = `${((getRandomInt(props.max_width -100 ) + 100)/props.max_width) * 100}%`;
        // randomTop = "30%"
        // randomLeft = "50%"
        console.log(randomTop)
        const randomWidth = `20px`;
        const randomHeight = `20px`;
    
        return {position:"relative" , top: randomTop, left: randomLeft, width: randomWidth, height: randomHeight };
    };
    const logos = [i, diego]
    return (

      <div className="logos">
      {logos.map((image, index) => {

        const logoStyle = generateRandomStyle();

        return (
          <div key={index} className="logo" style={logoStyle}>
            <img src={image} alt="Diego" style={{ width: '20px', height: '20px' }} />
          </div>
        );
      })}
    </div>
    

     
      
    );
  }