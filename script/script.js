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
        document.getElementById("test").innerHTML = lives;
    }
   flag = false;

      if (counter == target.length) {
        document.getElementById("test").innerHTML = "Hooray";

      }
      if (lives == 5)
      {
        document.getElementById("test").innerHTML = "Boo";

      }
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
var buttons = function() {
    alphButtons = document.getElementById("button_container");
    letter = document.createElement('ul');    //Don't want to bloat up the html with SEVERAL buttons, so I am going to use this function to create them

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
    for (var i = 0; i < target.length; i++)
    {
        targetArr[i].innerHTML = target[i];
    }


}
function play() {
    //Reset everything
    correctLetters.parentNode.removeChild(correctLetters);
    letter.parentNode.removeChild(letter);
    lives = 6;     //HEAD, BODY, ARM, ARM, LEG, LEG
    target = 0;
    targetArr = [];
    document.getElementById("word_container").innerHTML = "";
    document.getElementById("cheater").innerHTML = "Give me the word!";

    //Get a new word/ redo the buttons
    getWord();
    buttons();

}
getWord();
buttons();
document.getElementById("play").onclick = function() { play();};
document.getElementById("cheater").onclick = function() { cheat();};



