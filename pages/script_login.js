
/* getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
}); */

// Import the functions you need from the SDKs you need
/* import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js"; */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';

// Add Firebase products that you want to use
/* import { auth } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js'; */
/* import { firestore } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'; */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getAuth,onAuthStateChanged, signInWithRedirect, getRedirectResult, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
    

    
const firebaseConfig = {
  apiKey: "AIzaSyCVTcIykPvgTQPqayhZeznwT2gil_nnVyE",
  authDomain: "mini-block-game.firebaseapp.com",
  projectId: "mini-block-game",
  storageBucket: "mini-block-game.appspot.com",
  messagingSenderId: "1083865098554",
  appId: "1:1083865098554:web:ab31133fbf42d0dd44c803",
  measurementId: "G-600SD20J60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const signInGoogle = document.getElementById('google_signin');
const signIn = document.getElementById('signin');
const signUp = document.getElementById('signup');
/* -----------signin by google -------*/
signInGoogle.onclick = (e)=>{
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
}
/* ----------sign up by mail---------- */
signUp.onclick = (e) =>{
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("created ac by mail");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
    alert(errorMessage);
  });
}
/* -------------login by mail---------- */
signIn.onclick = (e) =>{
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('signed in by mail');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+errorMessage);
    alert(errorMessage);
  });
}
/* ------------------------change auth-------------- */
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    var displayName = user.displayName;
    console.log(user.displayName + " is signed in");
    window.location.pathname = ('/index.html');
  } else {
    // User is signed out
    console.log('im signed out');
  }
});
