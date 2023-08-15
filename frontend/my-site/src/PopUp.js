import React, { Children } from "react";
import {useState, useEffect, useReducer,useRef} from "react";

import "./PopUp.css"


export default function PopUp(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 }); 

  const togglePopUp = () => {
    props.togglePopUp(); 
  };

  const handleButtonClick = (event) => {
    setPosition({ x: event.clientX - 300  ? event.clientX : event.clientX +100,  y: event.clientY + 300 < window.screen.availHeight ? event.clientY : event.clientY - 200});
    togglePopUp(); 
  };
 
 

  return (
    
    <div>
      <b>
        <button className="popup-button" onClick={handleButtonClick}> {props.children} </button>
      </b>
      
      {props.showPopUp && (
       
        <div
          className="popup-card"
          style={{ position: "absolute", left: position.x, top: position.y}}>
          <div className="popup-description"><h1>{props.children}</h1><p>{props.desc}</p></div>
        </div>
      )}
    </div>
  );
}