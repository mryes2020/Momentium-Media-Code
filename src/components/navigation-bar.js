import React from "react"; 

// import css
import "../css/navigation-bar.css"; 



class NavigationBar extends React.Component{
    render() {
        return (
            <div className="navigation-bar">
                <h1 className="header-text">Momentium Media</h1>
                <ul className="navigation-bar-links">
                    <li><a href="./login">Login</a></li>
                    <li><a href="./register">Register</a></li>
                    <li><a href="./about">About</a></li>
                </ul>
            </div>
        ); 
    }
}

export default NavigationBar; 
