var time=null,clicks=null,t=null,flag=0,music_aud=0;
var c = 0;
var music = new Audio("extra/piano.mp3");
var click_aud= new Audio("extra/click.wav");
var timer_is_on = 0;
function audio_func()
{
  if(music_aud==0)
  {
    music.play();
    music.loop = true;
    music_aud=1;
    document.getElementById("bg").value="Background music [on]";
  }
  else
  {
    music.pause();
    music_aud=0;
    document.getElementById("bg").value="Background music [off]";
  }
  
}
function touched()
{
  if(flag==0)
    {
      alert("Great!! You caught the block once. Now you know how to catch it! But I won't be there to let you know everytime you catch the block");
      flag=1;
    }
  if(timer_is_on)
  {
    clicks=clicks+1;
    click_aud.play();
  }
}
function check_time_limit()
{
  if(document.getElementById("time_quantity").value>120)
    {
      document.getElementById("time_quantity").value=120;
    }
}
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
function play() 
{
  time = document.getElementById("time_quantity").value;
  document.getElementById("score").style.display = "none";
  document.getElementById("block").style.animationPlayState = "running";
  clicks=0;
  c=0;
  timer_is_on=1;
  document.getElementById("pause_btn").value="Pause";
  time_limit();
}

function game_end() {
  document.getElementById("block").style.animationPlayState = "paused";
  document.getElementById("_score").value = clicks;
  document.getElementById("score").style.display = "block";
  timer_is_on=0;
  document.getElementById("sco_lvl").innerHTML =" in "+document.getElementById('diff').value +" level";
  if(clicks<3)
    {
      document.getElementById("sco_fb").innerHTML ="Meh !, not good. I believe you can do better. Try the newbie mode , it exists for u &#128514;"
    }
  else if(clicks<7)
    {
      document.getElementById("sco_fb").innerHTML ="Nice ! looks like you have got the hang of it, keep going, you can improve &#128521; &#129505;"
    }
   else
     {
        document.getElementById("sco_fb").innerHTML ="Wait...What!?, Teach me how you did that too!! &#128561;"
     }
  clicks=null;
}
/*function time_limit()
{
  t = setTimeout(function(){ game_end() }, time*1000 );
}*/
function pause()
{
  var p_status = document.getElementById("pause_btn").value
  if(p_status=="Pause")
  {
    document.getElementById("block").style.animationPlayState = "paused";
    stopCount();
    document.getElementById("pause_btn").value="Play"
  }
  else
    {
      document.getElementById("block").style.animationPlayState = "running";
      startCount();
      document.getElementById("pause_btn").value="Pause"
    }
}
function Reset()
{
  document.getElementById("block").style.animationPlayState = "paused";
  clicks=null;
  clearTimeout(t);
  document.getElementById("time_quantity").value = "10";
  document.getElementById("op_time").value = "";
  document.getElementById("score").style.display = "none";
  if(document.getElementById("pause_btn").value=="Play")
    {
      document.getElementById("pause_btn").value="Pause"
    }
}
//---------------------------------------------------------------
//-------------------------------------------------------
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