//options close open menu ham design
$(".ham_burger").click(function(){
    $(".opts").slideToggle();
});

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';

// Add Firebase products that you want to use

import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

import { getFirestore, doc, getDoc, getDocs, onSnapshot, collection, orderBy, limit, query } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";


    
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
const db = getFirestore();
var displayName,uid;//global

onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      displayName = user.displayName;
      console.log(user.displayName + " is signed in");
    } else {
      // User is signed out
      console.log('user is signed out');
    }
});
/* ----------------table creation algorithm------- */
var PlayerNo = 0;
var tbody = document.getElementById('tbody1');
function AddItemToTable(name,score){
    let trow = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');

    td1.innerHTML = ++PlayerNo;
    td2.innerHTML = name;
    td3.innerHTML = score;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    tbody.appendChild(trow);
}
function AddAllItemsToTable(list){
    PlayerNo = 0;
    tbody.innerHTML = "";
    list.forEach(element => {
        AddItemToTable(element.name, element.score);
    });
}
/* --------get data  from firebase to the table 100rows REAL TIME UPDATE ---- */
document.getElementsByClassName('custom_btn')[0].addEventListener('click',()=>{ GetAllDataRealtime('newbie_20')});
document.getElementsByClassName('custom_btn')[1].addEventListener('click',()=>{ GetAllDataRealtime('newbie_40')});
document.getElementsByClassName('custom_btn')[2].addEventListener('click',()=>{ GetAllDataRealtime('newbie_60')});
document.getElementsByClassName('custom_btn')[3].addEventListener('click',()=>{ GetAllDataRealtime('easy_20')});
document.getElementsByClassName('custom_btn')[4].addEventListener('click',()=>{ GetAllDataRealtime('easy_40')});
document.getElementsByClassName('custom_btn')[5].addEventListener('click',()=>{ GetAllDataRealtime('easy_60')});
document.getElementsByClassName('custom_btn')[6].addEventListener('click',()=>{ GetAllDataRealtime('intermediate_20')});
document.getElementsByClassName('custom_btn')[7].addEventListener('click',()=>{ GetAllDataRealtime('intermediate_40')});
document.getElementsByClassName('custom_btn')[8].addEventListener('click',()=>{ GetAllDataRealtime('intermediate_60')});
document.getElementsByClassName('custom_btn')[9].addEventListener('click',()=>{ GetAllDataRealtime('hard_20')});
document.getElementsByClassName('custom_btn')[10].addEventListener('click',()=>{ GetAllDataRealtime('hard_40')});
document.getElementsByClassName('custom_btn')[11].addEventListener('click',()=>{ GetAllDataRealtime('hard_60')});
document.getElementsByClassName('custom_btn')[12].addEventListener('click',()=>{ GetAllDataRealtime('extreme hard_20')});
document.getElementsByClassName('custom_btn')[13].addEventListener('click',()=>{ GetAllDataRealtime('extreme hard_40')});
document.getElementsByClassName('custom_btn')[14].addEventListener('click',()=>{ GetAllDataRealtime('extreme hard_60')});

/* -----------get data once------ */
async function GetAllDataOnce(game_mode){
    console.log(game_mode);
    const querySnapshot = await getDocs(collection(db,game_mode));
    
    var list = [];

    querySnapshot.forEach(doc => {
        list.push(doc.data());
    });
    
    AddAllItemsToTable(list);
}
/* --------get data real time with sorted and limited-------- */
let CurrentGameModeDisplayed;

async function GetAllDataRealtime(game_mode){
    console.log(game_mode);
    CurrentGameModeDisplayed = game_mode;
    const dbRef = collection(db,game_mode);
    const orderedQuery = query(dbRef, orderBy("score", "desc"), limit(100));
//how to use orderby and limit?[note to self lol]
//tip: collection() and doc() to get ref of doc or collection ,thats it
//use query function with the reference u normally use in yr function then pass orderBy and limit
//with the querry, querry function basically customizes your collection or doc reference
//now store that in another reference and pass it to the place where u normally pass the reference
    onSnapshot(orderedQuery, (querySnapshot)=>{
        var list = [];
        querySnapshot.forEach(doc => {
            list.push(doc.data());
        });
        AddAllItemsToTable(list);
    });
}
/* --------algo for players score------get data once no real time-------- */
document.querySelector('.my_score').addEventListener('click',
    async function GetAllDataOnce(){
        let game_mode = CurrentGameModeDisplayed;

        const querySnapshot = await getDoc(doc(db,game_mode,uid));
        
        var list = [];
        list.push(querySnapshot.data());
        
        AddAllItemsToTable(list);
    }
);
