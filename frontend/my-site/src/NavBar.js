
import React from 'react';

import { Link , useMatch, useResolvedPath } from "react-router-dom"
import github_logo from './images/github-mark.svg';
import linkedin_logo from './images/linked-in-logo.png'
import mail_logo from './images/mail-logo.png'
import resume from './resources/Diego-Taveras-Resume.pdf'

function NavBar() {
  return <nav className= "nav">
    <Link to = "/" className= "site-title">
        Diego Taveras
    </Link>
    <ul className='external-links'>
        

        <li>
            <a href="https://github.com/diegotaveras" target="_blank" rel="noopener noreferrer">
                <img className="icons" src={github_logo} height="30px" alt="Github"></img>
            </a>

        </li>
        <li>
            <a href="https://www.linkedin.com/in/diego-taveras/" target="_blank" rel="noopener noreferrer">
                <img className="icons" src={linkedin_logo} height="30px" alt="Github"></img>
            </a>
        
        </li>
        <li>
    
            <a href="mailto:diegoat2@illinois.edu" target="_blank" rel="noopener noreferrer">
                <img className="icons" src={mail_logo} height="30px" alt="Github"></img>
            </a>
            

        </li>
    </ul>
  

    <ul className='custom-links'>
            <CustomLink to="/"> Home </CustomLink>
            <CustomLink to="/projects"> Projects </CustomLink>
            <CustomLink to="/resume"> Resume </CustomLink>
        
            
        
            {/* <CustomLink to="/contact"> Contact </CustomLink> */}
        
    </ul>

  </nav>
    
  
}

function CustomLink({to, children, ...props}) {
    const resolvedPath= useResolvedPath(to)
    const isActive = useMatch( { path: resolvedPath.pathname})
    if (to === "/resume") {
        return (
          <li className={isActive ? "active" : ""}>
            <a href={resume}>
            <Link to={resume} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </Link>
            </a>
            
          </li>
        );
      }
    return (
        <li className={isActive ? "active" : ""}>
            <a>
                <Link to={to} {...props}>
                    {children}
                </Link>
            </a>
        </li>
    )
}

export default NavBar;
