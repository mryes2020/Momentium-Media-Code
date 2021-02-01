import React from "react"; 
import "../css/register-css.css"; 
import "./firebase/database-connection"; 
import firebase from "firebase"; 


// global functions 

function check_username(username) {
    var rules = /^[A-Za-z0-9]*$/;
    
    if (rules.test(username) == false) return false;
    return true; 
}
function check_password(password) {
    var rules = /^[A-Za-z0-9\!\$\%\&\(\)\=\?\*\{\}\@\[\]\,\.]*$/;
    if (rules.test(password) == false) return false;
    return true; 
}

function check_simbols(username, password) {
    if (check_username(username) !== true) return false; 
    else {
        if (check_password(password) !== true) return false; 
        else return true; 
    }
}

function check_length(username, password) {
    if (username.length >= 5 && username.length <= 15) {
        if (password.length >= 10 && password.length <= 40) return true; 
        else return false; 
    }
    else return false; 
}

function check(username, password) {
	// by uncommenting those two lines you will enable a security layer - which will check if the username and password meet the required standards
	// example: (using regex) if the username contains only latin letters, numbers, ".", ",", "-", ....)
/*    if (check_length(username, password) !== true) return false; 
    if (check_simbols(username, password) !== true) return false; */
    return true; 
}



class RegisterForm extends React.Component {
    RegisterUser = (user_username, user_password) => {
        var db = firebase.firestore();
        db.collection("accounts").add({
            Username: user_username, 
            Password: user_password
        })
        document.getElementById("error-text").innerHTML = "Successfully Registered! Feel free to login and start uploading some good content!";
    }
    Register = () => {
        var username = document.getElementById("username").value; 
        var password = document.getElementById("password").value; 
        var retypedpass = document.getElementById("retyped-password").value;
        if (retypedpass !== password) document.getElementById("error-text").innerHTML = "Please make sure your passwords match!"; 
        else {
            if (check(username, password) === false) {
                document.getElementById("error-text").innerHTML = "Your credentials don't follow our security rules!";
            }
            else {
                const firestore = firebase.firestore(); 
                const coll = firestore.collection("accounts")
                    .get()
                    .then(querySnapshot => {
                        const data = querySnapshot.docs.map(doc => doc.data()); 
                        let count = 0; 
                        for (let a = 0; a < data.length; a++) {
                            let data_username = data[a].Username; 
                            if (username === data_username) {
                                document.getElementById("error-text").innerHTML = "Username already in use!";
                                count = 0; 
                                break;
                            }
                            else count++; 
                        }
                        if (count !== 0) {
                            this.RegisterUser(username, password);
                        }
                });
            }
        }
    }
    render() {
        return (
            <div className="register-form- container text-center">
                <h1>Register</h1>
                <p><a className="special-link">These </a> are the rules you and your credentials have to follow!</p>
                <hr></hr>
                <input className="register-input-" id="username" autoComplete="off" type="text" placeholder="New Username: "></input><br></br>
                <input className="register-input-" id="password" autoComplete="off" type="password" placeholder="New Password: "></input><br></br>
                <input className="register-input-" id="retyped-password" autoComplete="off" type="password" placeholder="Retype New Password: "></input><br></br>
                <button className="register-btn" onClick={this.Register}>Register</button><br></br>

                <small>Already have an account? Login <a className="special-link" href="./login">here</a>!</small>
                <p className="error-text" id="error-text"></p>
            </div>
        );
    }
}


export default RegisterForm;