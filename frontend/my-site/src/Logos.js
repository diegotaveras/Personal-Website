import React from "react";
import diego from "./images/diego.JPG";
// import resume from "./resources/Diego-Taveras-Resume.pdf";
import i from "./images/i.png"
import arrow from "./images/arrow.png"
import { useEffect } from "react";







export default function Logos() {
    return (

      <>
            <ul className="logos">
              <li className="logo">
                <i className="devicon-react-original colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'>React</h3>
              </li>
              <li className="logo">
                <i className="devicon-angularjs-plain colored" style={{ fontSize: "100px" }}></i>        
                <h3 cassName='logo-label'>Angular</h3>
              </li>
              <li className="logo">
                <i className="devicon-spring-plain colored" style={{ fontSize: "100px" }}></i>        
                <h3 className='logo-label'>Spring</h3>
              </li>
              <li className="logo">
                <i className="devicon-amazonwebservices-plain-wordmark colored" style={{ fontSize: "100px" }}></i>        
                <h3 className='logo-label'>Amazon Web Services</h3>
              </li>
            
              <li className="logo">
                <i className="devicon-cplusplus-line colored" style={{ fontSize: "100px" }}></i>        
                <h3 className='logo-label'>C++</h3>
              </li>
              <li className="logo">
                <img height="100px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
                <h3 className="logo-label"> Python </h3>
              </li>

              <li className="logo">
                <img height="100px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" />
                <h3 className='logo-label'>Java</h3>
              </li>  

              <li className="logo">
                <i class="devicon-typescript-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Typescript </h3>
              </li>    
              <li className="logo">
                <i class="devicon-javascript-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Javascript </h3>
              </li>  
              <li className="logo">
                <i class="devicon-mysql-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> MySQL </h3>
              </li>    
                
              <li className="logo">
                <i class="devicon-unix-original colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Unix </h3>
              </li>   
              <li className="logo">
                <i class="devicon-django-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Django </h3>
              </li>  
              <li className="logo">
                <i class="devicon-html5-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> HTML5 </h3>
              </li>  
              <li className="logo">
                <i class="devicon-sass-original colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Sass </h3>
              </li>  
              <li className="logo">
                <i class="devicon-css3-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> CSS3 </h3>
              </li>  
              <li className="logo">
                <i class="devicon-mongodb-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> MongoDB </h3>
              </li>  
              <li className="logo">
                <i class="devicon-kotlin-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Kotlin </h3>
              </li> 
              <li className="logo">
                <i class="devicon-cmake-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> CMake </h3>
              </li> 
              <li className="logo">
                <i class="devicon-git-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Git </h3>
              </li> 
              <li className="logo">
                <i class="devicon-docker-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Docker </h3>
              </li> 
              <li className="logo">
                <i class="devicon-vscode-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> VSCode </h3>
              </li> 
              <li className="logo">
                <i class="devicon-android-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Android </h3>
              </li> 
              <li className="logo">
                <i class="devicon-numpy-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> NumPy </h3>
              </li> 
              <li className="logo">
                <i class="devicon-bash-plain" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Bash </h3>
              </li> 
              <li className="logo">
                <i class="devicon-gradle-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Gradle </h3>
              </li> 
              <li className="logo">
                <i class="devicon-jupyter-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Jupyter</h3>
              </li> 
              <li className="logo">
                <i class="devicon-linux-plain" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Linux </h3>
              </li> 
              <li className="logo">
                <i class="devicon-networkx-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Networkx </h3>
              </li> 
              <li className="logo">
                <i class="devicon-npm-original-wordmark colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> npm </h3>
              </li> 
              <li className="logo">
                <i class="devicon-ubuntu-plain colored" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> ubuntu </h3>
              </li> 
              <li className="logo">
                <i class="devicon-markdown-original" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Markdown </h3>
              </li> 
              <li className="logo">
                <i class="devicon-bootstrap-plain" style={{ fontSize: "100px" }}></i>
                <h3 className='logo-label'> Bootstrap </h3>
              </li> 
                  
            </ul>
          </>
  
    );
  }