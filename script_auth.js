import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';
import { getAuth,updateProfile,onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyCVTcIykPvgTQPqayhZeznwT2gil_nnVyE",
    authDomain: "mini-block-game.firebaseapp.com",
    projectId: "mini-block-game",
    storageBucket: "mini-block-game.appspot.com",
    messagingSenderId: "1083865098554",
    appId: "1:1083865098554:web:ab31133fbf42d0dd44c803",
    measurementId: "G-600SD20J60"
};
var displayName;//global
var uid;//global
var IS_ONLINE = false;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      IS_ONLINE = true;
      uid = user.uid;
      displayName = user.displayName;
      if(displayName === null){
        $(".enterIGN").css('display','grid');
        document.getElementsByClassName("ign_input")[0].addEventListener('keydown',(e)=>{
          if(e.key == "Enter"){
            let valueOfIgn = document.getElementsByClassName("ign_input")[0].value;
            $(".enterIGN").css('display','none');
            displayName = valueOfIgn;
            updateProfile(auth.currentUser, {
              displayName: displayName
            }).then(() => {
              // Profile updated!
              console.log('display name updated');
            }).catch((error) => {
              // An error occurred
              console.log(error);
            });
            document.getElementsByClassName('ign')[0].innerHTML = displayName;
          }
        });
      }
      console.log(user.displayName + " is signed in");
      $(".signin_popup").hide();
      document.getElementsByClassName('online_status')[0].innerHTML ="<i class='fas fa-circle' style='font-size:0.6em;color:green'></i> online";
      document.getElementsByClassName('ign')[0].innerHTML = displayName ;
      $('#ign_edit').css('display','inline');
    } else {
      // User is signed out
      IS_ONLINE = false;
      document.getElementsByClassName('ign')[0].innerHTML = "" ;
      $('#ign_edit').css('display','none');
      document.getElementsByClassName('online_status')[0].innerHTML ="<i class='fas fa-circle' style='font-size:0.6em;color:red'></i> offline mode <br/>your scores won\'t be recorded";
      console.log('im signed out');
    }
});
/* ---------------sign out--------------- */
document.getElementById('signout').addEventListener('click',()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('user signed out');
      }).catch((error) => {
        // An error happened.
        console.log('user could not sign out'+error);
      });
});

const ign_style = "border:none;outline:none;border-bottom:1px solid;backgroud:transparent;color:white;";
const ign_confirm_btn = "<button id='ign_confirm' class='custom_btn'><i class='material-icons' style='font-size:1.3em;transform:translateY(3px);'>done</i></button>";

document.getElementById('ign_edit').addEventListener('click',()=>{
  document.getElementsByClassName('ign')[0].innerHTML="<input type='text' id='ign_ip' style='" +ign_style+ "'/> "+ign_confirm_btn;
  $('#ign_edit').css('display','none');
  
  document.getElementById('ign_confirm').addEventListener('click',()=>{
    $('#ign_edit').css('display','inline');
    displayName = document.getElementById('ign_ip').value;
    updateProfile(auth.currentUser, {
      displayName: displayName
    }).then(() => {
      // Profile updated!
      console.log('display name updated');
    }).catch((error) => {
      // An error occurred
      console.log(error);
    });
    document.getElementsByClassName('ign')[0].innerHTML = displayName;
  });
});
/* ------------data leaderboard check add update------------- */
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
const db = getFirestore();

window.leaderBoardCheck = async function leaderBoardCheck(clicks,difficulty,time_taken){
  //console.log("yes its working");
  if(!IS_ONLINE){
    console.log('sign in to record score');
    return;
  }
  console.log(clicks+difficulty+time_taken);
  
  const docRef = doc(db, difficulty+"_"+time_taken,uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    if(docSnap.data().score < clicks){
      //add the score
      await setDoc(docRef, {
        name: displayName,
        score: clicks
      });
      console.log("new highscore reached !");
      alert("Congragulations! You reached a new highscore !");
    }
  } else {
    // doc.data() will be undefined in this case
    console.log("No such leaderboard document found for this user,creating new document for this mode");
    //then add the score
    await setDoc(docRef, {
      name: displayName,
      score: clicks
    });
    console.log("new doc created for this user with the current score");
  }
}