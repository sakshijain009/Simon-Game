var colors=["red","green","blue","yellow"];
var gamePattern=[];
var userPattern=[];

var level=0;
var on=false;

$(document).keypress(function(){
	if(!on){
		on=true;
		nextSequence();
	}
});


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  animateOnPressed(userChosenColour);

  check(userPattern.length-1);
});


//-------------------------Funcions----------------------------------
function nextSequence(){
	userPattern=[];
	level++;
	$('#level-title').text("Level "+level);

	var random = Math.floor(Math.random()*4);
	var randomColor=colors[random];
	gamePattern.push(randomColor);
	$("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomColor);
}

//------------------------------------------------------------
function check(len){
	if(gamePattern[len]===userPattern[len]){
		if (userPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 500);
      }
	}else{
		playSound("wrong");
		$('#level-title').text("Game Over, Press any key to restart");
		$('body').addClass("game-over");
		
		setTimeout(function () {
				$('body').removeClass("game-over");
			}, 800);
		startAgain();
	}
}

//------------------------------------------------------------
function startAgain(){
	level=0;
	on=false;
	gamePattern=[];
}

//------------------------------------------------------------
function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
  	audio.play();
}

//-------------------------------------------------------------
function animateOnPressed(name){
	$('#'+ name).addClass('pressed');
	setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}