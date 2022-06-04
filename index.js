
//arrays
var gamePatterns = [];
var gameChoices = [];
var level;
var clicks = 0;

// inicio
var started = "inicio";
$(document).keydown(function(){
    if (started == "inicio"){
        level = 1;
        $(".title").text("Level " + level);
        randomColor();
        level++;
    } else if (started == "gg"){
        location.reload();
    }
});


// clicks
$(".g").click(function(){
    clicks++;
    playAnimation(1);
    gameChoices.push(1);
    checkChoice();
    if(clicks==gamePatterns.length)checkAnswers();
});
$(".r").click(function(){
    clicks++;
    playAnimation(2);
    gameChoices.push(2);
    checkChoice();
    if(clicks==gamePatterns.length)checkAnswers();
});
$(".y").click(function(){
    clicks++;
    playAnimation(3);
    gameChoices.push(3);
    checkChoice();
    if(clicks==gamePatterns.length)checkAnswers();
});
$(".b").click(function(){
    clicks++;
    playAnimation(4);
    gameChoices.push(4);
    checkChoice();
    if(clicks==gamePatterns.length)checkAnswers();
});



//functions

function changeClass(color){
    color.addClass("pressed");
    setTimeout(function(){
        color.removeClass("pressed");
    }, 200)
}

function playAnimation(color){
    switch (color) {
        case 1:
            var a_g = new Audio("sounds/green.mp3");
            a_g.play();
            changeClass($(".g"));
            break;
        case 2:
            var a_r = new Audio("sounds/red.mp3");
            a_r.play();
            changeClass($(".r"));
            break;
        case 3:
            var a_y = new Audio("sounds/yellow.mp3");
            a_y.play();
            changeClass($(".y"));
            break;
        case 4:
            var a_b = new Audio("sounds/blue.mp3");
            a_b.play();
            changeClass($(".b"));
            break;
        default:
            break;
    }
}

function randomColor(){
    var choice = Math.floor((Math.random()*4)+1);
    switch (choice) {
        case 1:
            playAnimation(1);
            break;
        case 2:
            playAnimation(2);
            break;
        case 3:
            playAnimation(3);
            break;
        case 4:
            playAnimation(4);
            break;
        default:
            break;
    }
    gamePatterns.push(choice);
    started = "jugando";
}

function checkAnswers(){
    var mc = 0;
    for (var i = 0; i < gamePatterns.length; i++) {        
            if(gamePatterns[i]==gameChoices[i]){
                mc++
            }else{
                wrongAnswer();
                break;
            }
    }
    clicks=0;
    if (mc == gamePatterns.length){
        console.log("iguales");
        console.log(mc);
        setTimeout(function(){
            randomColor();
        }, 800);
        $(".title").text("Level " + level);
        level++;
        gameChoices=[];
    }
}

function checkChoice(){
    if(gamePatterns[clicks-1]!=gameChoices[clicks-1]){
        wrongAnswer();
    }
}

function wrongAnswer(){
    console.log("NO iguales");
    $(".gg").css("visibility","visible");
    $(".title").text("Press Any Key to Restart");
    $(".title").css("font-size", "3rem");
    started = "gg";
    console.log(event.srcElement.classList[0]);
    $("." + event.srcElement.classList[0]).addClass("wrong");
    var a_wrong = new Audio("sounds/wrong.mp3");
    a_wrong.play();
}

