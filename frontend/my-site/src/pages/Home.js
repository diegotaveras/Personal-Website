import React from "react";
import diego from "../images/diego.JPG";
// import resume from "./resources/Diego-Taveras-Resume.pdf";
import i from "../images/i.png"
import arrow from "../images/arrow.png"
import Particles from "react-tsparticles"
import flag from "../images/Puerto_Rico_flag.svg"
import { useCallback ,useRef, useLayoutEffect, useState, useEffect} from "react";
import { loadFull} from "tsparticles"
import Logos from "../Logos";


<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"></link>



export default function Home() {
  const ref = useRef(null);
  const ref2 = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center"});
  };
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    setWidth(ref2.current?.offsetWidth);
    setHeight(ref2.current?.offsetHeight);
    console.log(ref2.current?.offsetWidth)
  }, []);
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


          <div ref={ref2} className='particles'>
          {/* <Logos max_width={1000}max_height={height}></Logos> */}

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

            <h1 className="hello">Hello! I'm <span className="diego"> Diego.</span> 
            <button className="explore" onClick={handleClick}>
                <img src={arrow} className="arrow" height="20px"></img>  <p>About Me!</p>
            </button>
            </h1>   
          </div>

          <div className="about-me">
          <img src={diego} className="diego-image"></img>
            <div ref={ref} className="intro-text">
              <h1>
                About me
              </h1>
              <p> Hi! I'm a junior 
                    studying Computer Science at the University of Illinois at Urbana-Champaign <span className="uiuc"> (UIUC)</span> 
                    . My main interests are full-stack software development, cybersecurity, and machine learning.
                    I am from Puerto Rico <span><img src={flag} height={18}></img> </span>. I enjoy exercising, listening to music, and playing videogames.
                    Check the <span className="projects-text"> <a href="/projects">Projects</a> </span>tab to learn more about my projects!
              </p>
              
            </div>
          </div>
          
                
        
        <div className="tech"> 
          <h1>
            Tech
          </h1>
          <div className="logos">
            <div className="logo">
              <i className="devicon-react-original colored" style={{ fontSize: "100px" }}></i>
              <h3 className='logo-label'>React</h3>
            </div>
            <i className="devicon-angularjs-plain colored" style={{ fontSize: "100px" }}></i>        
            <h3 className='logo-label'>Angular</h3>

            <i className="devicon-spring-plain colored" style={{ fontSize: "100px" }}></i>        
            <h3 className='logo-label'>Spring</h3>

            <i className="devicon-amazonwebservices-original colored" style={{ fontSize: "100px" }}></i>        
            <h3 className='logo-label'>Amazon Web Services</h3>
          </div>

          
        </div>

        <div className="footer"> 
              <h4> Designed by Diego </h4>
              <p>Last updated on 8/4/2023</p>
        
        </div>
        
      </div>
      
    );
  }
  