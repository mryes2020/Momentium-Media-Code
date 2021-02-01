import React from "react"; 
import "../css/main-page-css.css"; 
import "./firebase/database-connection"; 
import firebase from "firebase"; 
import Cookies from "universal-cookie";
import $ from "jquery"; 
const cookies = new Cookies();


// showdatabase function 
function showDatabase() {
    const firestore = firebase.firestore(); 
    const coll = firestore.collection("posts")
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data()); 
            for (let a = 0; a < data.length; a++) {
                let PostID = data[a].PostID
                let author = data[a].Author
                let header = data[a].Header
                let body = data[a].Body
                let image = data[a].Post_Image
                
                let name = image.replace("/","");
                // download image
                let  child_div = "";  
                firebase.storage().ref(name.replace("/", "")).getDownloadURL()
                    .then((url) => {
                        let image = url; 
                        child_div = "<div class='post-'><h2>" + header + "</h2><hr></hr><img src='" + image + "' class='post-image- img img-fluid w-100'><br></br><p>Posted by: " + author + "</p><p>" + body + "</p>"; 
                        $(".posts-container- .container").append(child_div);
                    })

            }
            console.log("Called!!");
    });
}
// global functions 
class MainPage extends React.Component {
    Register = () => {
        let username = cookies.get("Username_"); 
        let password = cookies.get("Password_"); 
        const firestore = firebase.firestore(); 
        let count = 0; 
        const coll = firestore.collection("accounts")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data()); 
                for (let a = 0; a < data.length; a++) {
                    let data_username = data[a].Username; 
                    let data_password = data[a].Password;
                    if (data_username === username && data_password === password)  {
                        count = 0; 
                        break; 
                    }else count++;
                }
                if (count >= 1) window.location.href="./login";
                
        });
    }

    // logout function 
    logOut = () => {
        // disable cookies 
        cookies.remove("Username_");
        cookies.remove("Password_");
        window.location.href="./login";
    }

    // modal functions 
    ClosePublishModal = () => {
        $("#modal-border").fadeOut(100); 
    }
    openModal = () => {
        $("#modal-border").fadeIn(100);
    }

    // publish post function 
    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    publishPost = () => {
        let author = cookies.get("Username_"); 
        let header = document.getElementById("Header").value;
        let body = document.getElementById("Body").value;
        let db = firebase.firestore(); 
        let id = this.getRndInteger(1, 1000000);
        const ref = firebase.storage().ref();
        const the_file = document.querySelector("#File").files[0] ;

        const name = id + "-" + author + "-" + the_file.name;

        const metadata = {
            contentType: the_file.type
        }
        const task = ref.child(name).put(the_file, metadata);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                alert("Image Uploaded!")
            })


        var docData = {
            Author: author,
            Body: body, 
            Header: header, 
            PostID: id, 
            Post_Image: "/" + name
        };
        db.collection("posts").doc().set(docData).then(function() {
            alert("Post Uploaded!");
        });
    }
    // main render function
    render() {
        return (
            <div className="posts-container container text-left">
                {this.Register()}
                <div className="publish-post-container-">
                    <button className="fancy-button-1" onClick={() => this.openModal()}>Publish a Post</button>
                    <button className="fancy-button-1" onClick={() => this.logOut()}>Logout</button>
                </div>
                <hr></hr>
                {showDatabase()}
                {/* posts section */}
                <div className="posts-container-">
                    <div className="container">

                    </div>
                </div>

                {/* posts section */}

                {/* modals here */}

                {/* publish a post modal */}
                <div className="modal-border" id="modal-border">
                    <div className="publish-post-modal-" id="publish-post-modal-">
                        <div className="modal-content-container-">
                            <h1>Publish a post!</h1>
                            <p>Here you can freely publish a post!</p>
                            <div className="post-form-">
                                <input className="fancy-input" id="Header" type="text" placeholder="Header: "></input><br></br>
                                <input className="fancy-input" id="Body" type="text" placeholder="Body: "></input><br></br>
                                <input className="fancy-file-input" id="File" type="file"></input><br></br>
                                <button className="fancy-button-2 mx-1" onClick={() => this.publishPost()}>Publish</button>
                                <button className="fancy-button-2 mx-1" onClick={() => this.ClosePublishModal()}>Nevermind</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* publish a post modal */}

                {/* modals here */}
            
            </div>
        );
    }
}


export default MainPage;