import React from "react"; 
import "../css/about-css.css";

class AboutPage extends React.Component {
    render() {
        return ( 
            <div className="about-page container mt-5">
                <h1>About</h1>
                <hr></hr>
                <p>Hi! Let me introduce myself, I am Kevin Jerebica. A teenager from Slovenia who is interested in computers and programming. This is a project I made to get some new skills (Node.JS  and React.JS) which helped me a lot in my journey (as I leared a lot of new things and concepts).</p>
                <p>If you are interested in contacting me here is where you can do it: </p>
                <a className="about-me-btn" href="http://kevintheadminman.epizy.com">Website</a>
                <a className="about-me-btn" href="https://instagram.com/mryes__">Instagram</a>
                <a className="about-me-btn" href="https://github.com/mryes2020">Github</a>
            </div>
        ); 
    }
}

export default AboutPage; 