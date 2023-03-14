import React from "react";
import github_logo from './images/github-mark.png';
import linkedin_logo from './images/linked-in-logo.png'
import mail_logo from './images/mail-logo.png'





export default function Contact() {
    return <div className="contact"> 
    <div className="contact-title">
        <h1>
            Contact Me!
        </h1>
    </div>
    <div>
    <ul>
        <li>
            <a href="https://github.com/diegotaveras" target="_blank" rel="noopener noreferrer">
                <img src={github_logo} height="100px" alt="Github"></img>
            </a>

        </li>
        <li>
            <a href="https://www.linkedin.com/in/diego-taveras/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin_logo} height="100px" alt="Github"></img>
            </a>
        
        </li>
        <li>
    
            <a href="mailto:taverasd1003@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={mail_logo} height="100px" alt="Github"></img>
            </a>
            <body>at taverasd1003@gmail.com <br/> 
                    or diegoat2@illinois.edu
            </body>

        </li>
    
    </ul>
    </div>
    
    
    
    </div>;
}