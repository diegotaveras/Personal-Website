
import React from 'react';
import github_logo from './github-mark.png';
// import "./NavBar.css";
import { Link , useMatch, useResolvedPath } from "react-router-dom"

function NavBar() {
  return <nav className= "nav">
    <Link to = "/" className= "site-title">
        Diego Taveras
    </Link>
    <ul>
       
        <li>
            <CustomLink to="/projects"> Projects </CustomLink>
        </li>
        <li>
            <CustomLink to="/contact"> Contact </CustomLink>
        </li>
     
    </ul>

  </nav>
    
  
}

function CustomLink({to, children, ...props}) {
    const resolvedPath= useResolvedPath(to)
    const isActive = useMatch( { path: resolvedPath.pathname})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default NavBar;
