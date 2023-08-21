import React, { Children } from "react";
import {useState,useRef} from "react";

import "./PopUp.css"


export default function PopUp(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 }); 
  const ref = useRef(null)
  const togglePopUp = () => {
    props.togglePopUp(); 
  };

  const handleButtonClick = (event) => {
    console.log(ref.current?.clientHeight)
    setPosition({ x: event.clientX  ? event.clientX  : 0 ,  y:  (event.clientY +  200) < window.innerHeight  ? event.clientY : event.clientY - 100});
    togglePopUp(); 
  };
  
  


  
 

  return (
    
    <div>
      <b>
        <button className="popup-button" onClick={handleButtonClick}> {props.children} </button>
      </b>
      
      {props.showPopUp && (
       
        <div ref={ref}
          className="popup-card"
          style={{ position: "absolute", left: position.x, top: position.y}}>
          <div className="popup-description"><h1>{props.children}</h1><p>{props.desc}</p></div>
        </div>
      )}
    </div>
  );
}