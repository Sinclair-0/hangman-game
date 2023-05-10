// Will use https://random-word-api.vercel.app/api?words=1
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];
var target;     //The target word the user wants to find
var userGuess;
var targetList;
var targetArr = [];
var lives = 6;
var flag = false;
var counter = 0;
var xCent = document.getElementById("hangman_container").clientWidth/2;     //Gets the center of the x-axis on the container the stickfigure will be drawn in


function drawFigure () {
    if (lives == 5)
        head();
    if (lives == 4)
        torso();
    if (lives == 3)
        rightArm();
    if (lives == 2)
        leftArm();
    if (lives == 1)
        rightLeg();
    if (lives == 0)
    {
        leftLeg();
        endGame();
    }
}

function head() {
    theStickman = document.getElementById("stickman");
    context = theStickman.getContext('2d');
    stickman.width = 250;
    stickman.height = 250;
    context.beginPath();
    context.strokeStyle = "#10F2D0";
    context.lineWidth = 4;
    context.arc(xCent, 50, 25, 0, Math.PI*2);
    context.stroke();
};
    
function draw(xStart, yStart, xEnd, yEnd) {         //since all the other body parts are straight lines, make a function for all of them
    context.strokeStyle = "#10F2D0";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(xStart, yStart);
    context.lineTo(xEnd, yEnd);
    context.stroke(); 
};
 
function torso() {
    draw (xCent, 75, xCent, 140);
};
  
function rightArm() {
    draw (xCent, 95, xCent+20, 150);
   };
  
function leftArm() {
    draw (xCent, 95, xCent-20, 150);
   };
function leftLeg() {
    draw (xCent, 140, xCent-10, 215);
};
  
function rightLeg() {
    draw (xCent, 140, xCent+10, 215);
};
  


function checkCorrect() {
    for (var i = 0; i < target.length; i++)
    {
        if (target[i] == userGuess)
        {
            flag = true;
            targetArr[i].innerHTML = userGuess;
            counter++;
        }
    }
    if (flag == false)
    {
        lives --;
        drawFigure();

    }
   flag = false;
    if (counter == target.length)
        endGame();
};
function fillTargetWord() {
    wordHold = document.getElementById("word_container");
    correctLetters = document.createElement('ul');
    for (var i = 0; i < target.length; i++)
    {
        userGuess = document.createElement('li');
        correctLetters.setAttribute("id", "correct");
        userGuess.setAttribute("id", "guess");
        userGuess.innerHTML = "_";
        targetArr.push(userGuess);
        wordHold.appendChild(correctLetters);
        correct.appendChild(userGuess);
    }
};
async function getWord() {
    let response = await fetch('https://random-word-api.vercel.app/api?words=1');
    let word = await response.json();
    target = String(word);
  //  document.getElementById("head").innerHTML = target;
    fillTargetWord();
    //let length = checkCorrect(target);

};
function buttons() {
    alphButtons = document.getElementById("button_container");
    letter = document.createElement('ul');    //Don't want to bloat up the html with SEVERAL buttons, so I am going to use this function to create the
    letter.setAttribute("id", "letters");
    for (var i = 0; i < alphabet.length; i++) {
        letter.id = 'alphabet';            //set the letters to a class
        letterList = document.createElement('li');
        letterList.id = 'letter';
        letterList.innerHTML = alphabet[i];
        letterList.onclick = function() {
            userGuess = (this.innerHTML);          //Sets the user's guess
            this.setAttribute("class", "clicked");     //Have the class in css disable the button
            checkCorrect();
        }
        alphButtons.appendChild(letter);     //add the letters into the buttons.
        letter.appendChild(letterList);      //letter is an unordered list, this fills it with the list elements

        

    }

}

function cheat() {
    document.getElementById("cheater").innerHTML = "Cheater!";
    lives = 0;      //Set lives to 0, so it displays a losing result
    endGame();
}

function play() {
    //Reset everything
    correctLetters.parentNode.removeChild(correctLetters);          //Remove the parent of the list by deleting itself
    letter.parentNode.removeChild(letter);

    lives = 6;        //HEAD, BODY, ARM, ARM, LEG, LEG
    target = 0;
    counter = 0;
    targetArr = [];
    document.getElementById("word_container").innerHTML = "";
    document.getElementById("cheater").innerHTML = "Give me the word!";
    document.getElementById("cheater").disabled = false;
    let canvas = document.getElementById("stickman");
    document.getElementById("result").innerHTML = "";
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);


    //Get a new word and redo the buttons
    getWord();
    buttons();

}

function endGame() {
    document.getElementById("cheater").disabled = true;
    const list = document.getElementById("letters")
    for (var i = 0; i < target.length; i++)
        targetArr[i].innerHTML = target[i];             //Fill in the word, in case the user did not guess it
  
    for(var i = 0; i < alphabet.length; i++)            //Disable all buttons
    {
        let temp = letter.children[i];
        temp.setAttribute("class", "clicked");
    }
    if (lives == 0)
        document.getElementById("result").innerHTML = "You Lose! :C";
    else
        document.getElementById("result").innerHTML = "You Win! :D";
}


getWord();
buttons();
document.getElementById("play").onclick = function() { play();};
document.getElementById("cheater").onclick = function() { cheat();};