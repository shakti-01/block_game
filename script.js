var time=null,clicks=null,t=null,flag=0,bgmusic_is_on=0;//c and t in time limit function
var c = 0;
var music = new Audio("extra/bg/piano.mp3");
var click_aud= new Audio("extra/click/click.wav");
var timer_is_on = 0;
var vol_val=0.5;
var game_is_on = 0;
//---bg music
function audio_func()
{
  if(bgmusic_is_on==0)
  {
    music.play();
    music.loop = true;
    music.volume=vol_val;
    bgmusic_is_on=1;
    document.getElementById("bg").value="Background music [on]";
  }
  else
  {
    music.pause();
    music.loop = false;
    bgmusic_is_on=0;
    document.getElementById("bg").value="Background music [off]";
  }
//the event after box is clicked  
}
//old touched
/* function touched()
{
  if(timer_is_on)
  {
    clicks=clicks+1;
    click_aud.load();
    click_aud.play();
  }
} */
//new touched in v2.0
document.getElementById('block').onmousedown = ()=>{
  if(timer_is_on){
    clicks=clicks+1;
    click_aud.load();
    click_aud.play();
  }
};
//time limit is not higher than max check
function check_time_limit()
{
  let flag = 0;
  let time = document.getElementById("time_quantity");
  let time_value = document.getElementById("time_quantity").value;
  if(time_value == 20 || time_value == 40 || time_value == 60){
    flag = 0;
  }
  else if(time_value > 60){
    time.value = 60;flag = 1;
  }
  else if(time_value > 40){
    time.value = 40;flag = 1;
  }
  else if(time_value > 20){
    time.value = 20;flag = 1;
  }
  else if(time_value < 20){
    time.value = 20;flag = 1;
  }
  if(flag){
    alert("The time modes currently available are 20, 40, 60 seconds only");
  }
}
//difficulty level settings
function diff_change()
{
  var difficulty = document.getElementById("diff").value;
  if(difficulty=="newbie")
    {
      document.getElementById("block").style.animationDuration = "50s";
    }
  else if(difficulty=="easy")
    {
      document.getElementById("block").style.animationDuration = "37s";
    }
  else if(difficulty=="intermediate")
    {
      document.getElementById("block").style.animationDuration = "25s";
    }
  else if(difficulty=="hard")
    {
      document.getElementById("block").style.animationDuration = "18s";
    }
  else
    {
      document.getElementById("block").style.animationDuration = "12s";
    }
}
//do not let the player scroll inside the playing area while the game is on 
//only for touch screen players
function preventScrolling(e){
  e.preventDefault();
}
//game started
function play() 
{
  document.getElementById('container').addEventListener('touchmove',preventScrolling);
  game_is_on = 1;
  time = document.getElementById("time_quantity").value;
  document.getElementById("score").style.display = "none";
  document.getElementById("block").style.animationPlayState = "running";
  clicks=0;
  c=0;
  timer_is_on=1;
  document.getElementById("pause_btn").value="Pause";
  document.getElementById("container").scrollIntoView({block:"center"});
  diff_change();
  time_limit();
}
//game over/ends 
function game_end() {
  document.getElementById('container').removeEventListener('touchmove',preventScrolling);
  game_is_on = 0;
  document.getElementById("block").style.animationPlayState = "paused";
  document.getElementById("_score").value = clicks;
  document.getElementById("score").style.display = "grid";
  document.getElementById("score").scrollIntoView({block:"center"});
  timer_is_on=0;
  //feedback system
  document.getElementById("sco_lvl").innerHTML =" in "+document.getElementById('diff').value +" level";
  if(clicks<3)
    {
      document.getElementById("sco_fb").innerHTML ="Meh ! not good. I believe you can do better. Try the newbie mode , it exists for you &#128514;"
    }
  else if(clicks<7)
    {
      document.getElementById("sco_fb").innerHTML ="Nice ! looks like you have got the hang of it, keep going, you can improve &#128521; &#129505;"
    }
   else if(clicks<14)
     {
        document.getElementById("sco_fb").innerHTML ="Wait...What!?  Teach me how you did that too!! &#128561;"
     }
  else if(clicks<25)
    {
      document.getElementById("sco_fb").innerHTML ="WoW !! Looks like you were born to be a champion!! &#127942;"
    }
  else if(clicks<35)
    {
      document.getElementById("sco_fb").innerHTML ="Oh my god you have grown so much that, at last you can reach here ! &#128522;"
    }
  else if(clicks<40)
    {
      document.getElementById("sco_fb").innerHTML ="The score went through the roof !!! &#128565; &#128293;"
    }
  else if(clicks<55)
    {
      document.getElementById("sco_fb").innerHTML ="You have come so far, but do you have any idea how far you can go? What is the highest score possible? &#128578;"
    }
  else
    {
      document.getElementById("sco_fb").innerHTML ="So long have i waited for you to reach here, my dear !! &#128584; &#128587; &#128515;"
    }
  //-------------check that player is online and if is then add score if its highest
  leaderBoardCheck(clicks,document.getElementById('diff').value,time);
  clicks=null;
}
/*function time_limit()
{
  t = setTimeout(function(){ game_end() }, time*1000 );
}*/
//game paused
function pause()
{
  if(!game_is_on){
    return;
  }
  var p_status = document.getElementById("pause_btn").value
  if(p_status=="Pause")
  {
    document.getElementById("block").style.animationPlayState = "paused";
    stopCount();
    document.getElementById("pause_btn").value="Play";
    document.getElementById('container').removeEventListener('touchmove',preventScrolling);
  }
  else
    {
      document.getElementById("block").style.animationPlayState = "running";
      startCount();
      document.getElementById("pause_btn").value="Pause";
      document.getElementById('container').addEventListener('touchmove',preventScrolling);
    }
}
//reset the game
function Reset()
{
  if(!game_is_on){
    return;
  }
  game_is_on = 0;
  document.getElementById('container').removeEventListener('touchmove',preventScrolling);
  document.getElementById("block").style.animationPlayState = "paused";
  clicks=null;
  stopCount();
  //document.getElementById("time_quantity").value = "10";
  document.getElementById("op_time").value = "";
  document.getElementById("score").style.display = "none";
  if(document.getElementById("pause_btn").value=="Play")
    {
      document.getElementById("pause_btn").value="Pause"
    }
}
//---------cancel fb
function cncl_fb()
{
  document.getElementById("score").style.display = "none";
}
//---------------------------------------------------------------
//-------------------------------------------------------
//timer settings and execution
function time_limit() 
{
  if(c<=time)
  {
    document.getElementById("op_time").value = c;
    c = c + 1;
    t = setTimeout(time_limit, 1000);
  }
  else
  {
     game_end();
  }
}

function startCount() 
{
  if (!timer_is_on) 
  {
    timer_is_on = 1;
    time_limit();
  }
}

function stopCount() 
{
  clearTimeout(t);
  timer_is_on = 0;
}
//------------------------settings div
function settings_close()
{
  document.getElementById("settings").style.display="none";
}
function settings_open()
{
  document.getElementById("settings").style.display="block";
  document.getElementById("settings").style.position="fixed";
  //document.getElementById("settings").style.overflow="auto";
}
function click_choose()
{
  var click_option = document.getElementById("clicksong").value;
  if(click_option=="1"){
    click_aud = new Audio("extra/click/click.wav");
    click_aud.play();
  }
  else if(click_option=="2"){
    click_aud = new Audio("extra/click/arcade_casino.wav");
    click_aud.play();
  }
  else if(click_option=="3"){
    click_aud = new Audio("extra/click/error.wav");
    click_aud.play();
  }
  else if(click_option=="4"){
    click_aud = new Audio("extra/click/melodic_tone.wav");
    click_aud.play();
  }
  else if(click_option=="5"){
    click_aud = new Audio("extra/click/mouse_click.wav");
    click_aud.play();
  }
  else if(click_option=="6"){
    click_aud = new Audio("extra/click/negative_tone.wav");
    click_aud.play();
  }
  else if(click_option=="7"){
    click_aud = new Audio("extra/click/positive_beep.wav");
    click_aud.play();
  }
  else if(click_option=="8"){
    click_aud = new Audio("extra/click/scifi_click.wav");
    click_aud.play();
  }
  else if(click_option=="9"){
    click_aud = new Audio("extra/click/vid_game.wav");
    click_aud.play();
  }
  else if(click_option=="10"){
    click_aud = new Audio("extra/click/vid_game_quest.wav");
    click_aud.play();
  }
  else if(click_option=="11"){
    click_aud = new Audio("extra/click/vid_game_retro.wav");
    click_aud.play();
  }
  else if(click_option=="12"){
    click_aud = new Audio("extra/click/warning.wav");
    click_aud.play();
  }
  else if(click_option=="13"){
    click_aud = new Audio("extra/click/water_scifi.wav");
    click_aud.play();
  }
}

function bg_choose(){
  var bg_option = document.getElementById("bgsong").value;
  music.pause();
  music.loop = false;
  if(bg_option=="1"){
    music = new Audio("extra/bg/piano.mp3");
  }
  else if(bg_option=="2"){
    music = new Audio("extra/bg/90sFlav Call me.mp3");
  }
  else if(bg_option=="3"){
    music = new Audio("extra/bg/Deemo.mp3");
  }
  else if(bg_option=="4"){
    music = new Audio("extra/bg/Flower Dance.mp3");
  }
  else if(bg_option=="5"){
    music = new Audio("extra/bg/ghost choir vocals.mp3");
  }
  else if(bg_option=="6"){
    music = new Audio("extra/bg/ghost choir.mp3");
  }
  else if(bg_option=="7"){
    music = new Audio("extra/bg/Gokukoku.mp3");
  }
  else if(bg_option=="8"){
    music = new Audio("extra/bg/Jade penetrate.mp3");
  }
  else if(bg_option=="9"){
    music = new Audio("extra/bg/Martin Garrix.mp3");
  }
  else if(bg_option=="10"){
    music = new Audio("extra/bg/MiddleIsland.mp3");
  }
  else if(bg_option=="11"){
    music = new Audio("extra/bg/Parasyte Next To You.mp3");
  }
  else if(bg_option=="12"){
    music = new Audio("extra/bg/sakuzyo.mp3");
  }
  else if(bg_option=="13"){
    music = new Audio("extra/bg/Sawawa.mp3");
  }
  else if(bg_option=="14"){
    music = new Audio("extra/bg/Senbonzakura.mp3");
  }
  if(bgmusic_is_on==1){
    music.play();
    music.volume=vol_val;
    music.loop = true;
  }
}
//--------------bgvol
function bg_vol(){
  vol_val=document.getElementById("bgvol").value
  vol_val=vol_val/100;
  music.volume=vol_val;
}
/* --------------------signin popup left--------------- */
//import { leaderBoardCheck } from "./pages/script_auth.js";

$(".cancel_signin").click(()=>{
  $(".signin_popup").slideUp(200);
});
