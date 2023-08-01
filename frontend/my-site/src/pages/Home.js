import React from "react";
import diego from "../images/diego.JPG";
// import resume from "./resources/Diego-Taveras-Resume.pdf";
import i from "../images/i.png"
import Particles from "react-tsparticles"
import { useCallback } from "react";
import { loadFull} from "tsparticles"

export default function Home() {


  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);
    return (
      <div className="home">
        {/* <img src={diego} alt="Diego" className="diego-image"/> */}

          <div className='particles'>
            <Particles
              id="tsparticles"
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                "fullScreen": { enable: false },
                "particles": {
                  "number": {
                    "value": 400,
                    "density": {
                      "enable": true,
                      "value_area": 800
                    }
                  },
                  "color": {
                    "value": "#ffffff"
                  },
                  "shape": {
                    "type": "circle",
                    "stroke": {
                      "width": 0,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 5
                    },
                    "image": {
                      "src": "img/github.svg",
                      "width": 100,
                      "height": 100
                    }
                  },
                  "opacity": {
                    "value": 0.8316673330667735,
                    "random": true,
                    "anim": {
                      "enable": true,
                      "speed": 1,
                      "opacity_min": 0,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 4,
                      "size_min": 0.3,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": false,
                    "distance": 441.11855061047646,
                    "color": "#ffffff",
                    "opacity": 1,
                    "width": 0.6301693580149663
                  },
                  "move": {
                    "enable": true,
                    "speed": 0.3,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 600
                    }
                  }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": true,
                      "mode": "grab"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 72.8963333144343,
                      "line_linked": {
                        "opacity": 1
                      }
                    },
                    "bubble": {
                      "distance": 250,
                      "size": 0,
                      "duration": 2,
                      "opacity": 0,
                      "speed": 3
                    },
                    "repulse": {
                      "distance": 400,
                      "duration": 0.4
                    },
                    "push": {
                      "particles_nb": 4
                    },
                    "remove": {
                      "particles_nb": 2
                    }
                  }
                },
                "retina_detect": false
              }}
            />
        
              
          </div>
          <h1 className="hello">Hello! I'm Diego </h1>
          <div className="intro-text">
            <p> Hi! I'm a junior 
                  studying Computer Science at the University of Illinois at Urbana-Champaign <span className="uiuc"> (UIUC)</span> 
                  . My main interests are full-stack software development, cybersecurity, and machine learning.
                  I am from Puerto Rico. As hobbies, I enjoy exercising, listening to music, and playing videogames.
                  Check the <span className="projects-text"> <a href="/projects">Projects</a> </span>tab to learn more about my projects!
            </p>
              
          </div>
                
        
        {/* <div className="tech"> 
        </div> */}
      </div>
      
    );
  }
  