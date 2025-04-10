let randomNumber1= Math.floor(Math.random()*6) +1;

let randomDiceImage = "Dice" + randomNumber1 + ".png";

let randomImageSources = "images/" + randomDiceImage; 

let image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src" , randomImageSources);

//for second dice

let randomNumber2 = Math.floor(Math.random()*6)+1;

let randomImageSources2 = "images/Dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", randomImageSources2 );

if(randomNumber1 > randomNumber2){
    document.querySelector("h1").innerHTML= "Player 1 Wins.";
}
else if(randomNumber2 > randomNumber1){
    document.querySelector("h1").innerHTML = "Player 2 Wins.";
}
else{
    document.querySelector("h1").innerHTML = "Draw.";
}