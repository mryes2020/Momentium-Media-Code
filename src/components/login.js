import React from "react"; 
import "../css/login-css.css"; 
import "./firebase/database-connection"; 
import firebase from "firebase"; 
import Cookies from "universal-cookie";


// global variables
const cookies = new Cookies(); 


class LoginForm extends React.Component {
    login = () => {

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        const firestore = firebase.firestore(); 
        const coll = firestore.collection("accounts")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data()); 
                let count = 0; 
                for (let a = 0; a < data.length; a++) {
                    let data_username = data[a].Username; 
                    let data_password = data[a].Password;
                    if (data_username === username && data_password === password)  {
                        cookies.set("Username_", username, {
                            path: "/"
                        });
                        cookies.set("Password_", password, {
                            path: "/"
                        });
                        window.location.href="./main-page";
                        count = 0; 
                        break; 
                    }else count++; 
                }
                if (count !== 0) {
                    const message = "Entered wrong credentials!"; 
                    document.getElementById("alert-text").innerHTML = message ;
                }
        });
    }
    render() {
        return (
            <div className="login-form- container text-center">
                <input className="login-input-" id="username" type="text" autocomplete="off" placeholder="Username: "></input><br></br>
                <input className="login-input-" id="password" type="password" autocomplete="off" placeholder="Password: "></input><br></br>
                <button className="login-btn" onClick={this.login}>Login</button><br></br>

                <small>Don't have an account? Make a new one <a className="login-link" href="./register">here</a>!</small>
                <p id="alert-text" className="alert-text"></p>
            </div>
        );
    }
}


export default LoginForm; 
