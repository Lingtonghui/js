// challenge 1: your age in days



function ageInDays(){
    var birthYear =prompt("what year were your born... good friend? ");
    var ageInDayss=(2018-birthYear)*365;
    console.log(ageInDayss);
    var h1=document.createElement("h1");
    var textAnswer=document.createTextNode("you are " + ageInDayss + " days old");
    h1.setAttribute("id","ageInDays");
    h1.appendChild(textAnswer);
    document.getElementById("flex-box-result").appendChild(h1);

}


function reset() { 
    document.getElementById("ageInDays").remove();
    // document.getElementById("flex-cat-gen").remove();

}


function generator() {
    var image=document.createElement("img");
    var div =document.getElementById("flex-cat-gen");
    image.src="./static/images/cat.png";
    image.className="info";
    div.appendChild(image);

}

    // console.log(yourChoice);
    // var humanChoice,btnChoice;
    // humanChoice=yourChoice.id;
    // btnChoice=numberToChoice(randToRpsInt());
    // results=decideWinner(humanChoice,btnChoice); [0,1]  human lost  vs btn won
    // message=finalMessage(result);   {"message":You won!,color:"green"} lost tied
    // btnChoice  red   humanChoice  blue 
    // rpsFrontEnd(yourChoice,btnChoice,message);
    // Math.floor(Math.random())
function rpsGame(yourChoice) { 
    var humanChoice,btnChoice;
    humanChoice=yourChoice.id;
    btnChoice=numberToChoice(randToRpsInt());
    console.log("computer choice " + btnChoice);

    results=decideWinner(humanChoice,btnChoice);
    console.log(results);

    message=finalMessage(results);
    console.log(message);

    console.log(yourChoice);
    rpsFrontEnd(yourChoice,btnChoice,message);
}


function randToRpsInt() {
    return  Math.floor(Math.random() * 3);
}


function numberToChoice(number) {
    return ["rock","paper","scissors"][number]
}

function decideWinner(yourChoice,computerChoice){
    var rpsDatabase={
        "rock":{
            "scissors":1,
            "rock":0.5,
            "paper":0
        },
        "paper":{
            "rock":1,
            "paper":0.5,
            "scissors":0
        },
        "scissors":{
            "paper":1,
            "scissors":0.5,
            "rock":0
        }
    };

    var yourScore=rpsDatabase[yourChoice][computerChoice];
    var computerScore=rpsDatabase[computerChoice][yourChoice];

    return [yourScore,computerScore];
}


function finalMessage([yourScore,computerScore]){
    if(yourScore===0){
        return {"message":"You lost","color":"red"};
    }else if(yourScore===0.5){
        return {"message":"You tied","color":"yellow"};
    }else{
        return {"message":"You won","color":"green"};
    }
}


function rpsFrontEnd(humanImageChoice,bothImageChoice,finalMessage){
    var imagesDatabase={
        "rock":document.getElementById("rock").src.slice(document.getElementById("rock").src.indexOf("static")),
        "paper":document.getElementById("paper").src.slice(document.getElementById("paper").src.indexOf("static")),
        "scissors":document.getElementById("scissors").src.slice(document.getElementById("scissors").src.indexOf("static")),
    }

    // console.log(imagesDatabase[humanImageChoice.id]);
    // lets remove all the items
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv =document.createElement("div");
    var botDiv =document.createElement("div");
    var messageDiv =document.createElement("div");


    humanDiv.innerHTML="<img src='" +imagesDatabase[humanImageChoice.id] +"' height=100 width=100 style='box-shadow:0px 10px 50px rgba(37,50,233,1);'>"
    document.getElementById("flex-box-rps-div").appendChild(humanDiv);


    botDiv.innerHTML="<img src='" +imagesDatabase[bothImageChoice] +"' height=100 width=100 style='box-shadow:0px 10px 50px rgba(243,38,24,1);'>"
    document.getElementById("flex-box-rps-div").appendChild(botDiv);

    messageDiv.innerHTML="<h1 style='color: " + finalMessage['color'] + ";font-style:60px;padding:30px '>" + finalMessage['message'] +"</h1>";
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);


}

// challenge 4

/* 


*/

var all_buttons=document.getElementsByTagName("button");
// console.log(all_buttons);

var copyAllButtons=[];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}


console.log(copyAllButtons);


function buttonColorChange(buttonThingy){
    if(buttonThingy.value==="red"){
        buttonsRed();
    }else if(buttonThingy.value==="green"){
        buttonsGreen();
    }else if(buttonThingy.value==="reset"){
        buttonColorReset();
    }else if(buttonThingy.value==="random"){
        randomColors();
    }
}


function buttonsRed(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");
    }
}

function buttonsGreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");
    }

}


function buttonColorReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices=["btn-primary","btn-success","btn-danger","btn-warning"];
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random()*4)]);
    }
}



// blackjack
let blackjackGame={
    "you":{"scoreSpan":"#your-blackjack-result","div":"#your-box","score":0},
    "dealer":{"scoreSpan":"#dealer-blackjack-result","div":"#dealer-box","score":0},
    "cards":["2","3","4","5","6","7","8","9","10","K","J","Q","A"],
    "cardsMap":{
        "2":2,
        "3":3,
        "4":4,
        "5":5,
        "6":6,
        "7":7,
        "8":8,
        "9":9,
        "10":10,
        "K":10,
        "J":10,
        "Q":10,
        "A":[1,11]
    },
    "wins":0,
    "losses":0,
    "draws":0,
    "isStand":false,
    "turnsOver":false,
};

const YOU=blackjackGame["you"];
const DEALER=blackjackGame["dealer"];
const hitSound=new Audio("static/sounds/swish.m4a");
const winSound=new Audio("static/sounds/cash.mp3");
const lossSound=new Audio("static/sounds/aww.mp3");

document.querySelector("#blackjack-hit-button").addEventListener("click",blackjackHit);


document.querySelector("#blackjack-stand-button").addEventListener("click",dealerLogic);


document.querySelector("#blackjack-deal-button").addEventListener("click",blackjackDeal);


// document.querySelector("#blackjack-hit-button").addEventListener("click",blackjackHit);
function blackjackHit(){
    //当点击了stand按钮表示已经(在点击hit按钮时)不能在更新发牌了
    if(blackjackGame["isStand"]===false){
        let card=randomCard();


        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
    

    // console.log(YOU["score"]);
    // showCard(card,DEALER);
}



function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame["cards"][randomIndex];
}

function updateScore(card,activePlayer){

    //if adding 11 keeps me bellow 21; add 11 otherwise add 1;
    if(card==="A"){
        if(activePlayer["score"] + blackjackGame["cardsMap"][card][1] <=21){
            activePlayer["score"]+=blackjackGame["cardsMap"][card][1];
        }else{
            activePlayer["score"]+=blackjackGame["cardsMap"][card][0];
        }
    }else{
        activePlayer["score"] +=blackjackGame["cardsMap"][card];
    }
}

function showScore(activePlayer){
    if(activePlayer["score"]>21){
        document.querySelector(activePlayer["scoreSpan"]).textContent="BUST!";
        document.querySelector(activePlayer["scoreSpan"]).style.color="red";

    }else{
        document.querySelector(activePlayer["scoreSpan"]).textContent=activePlayer["score"];
    }
}


function showCard(card,activePlayer){
    if(activePlayer["score"]<=21){
        let cardImage=document.createElement("img");
        cardImage.src= `./static/images/${card}.png`;
        cardImage.className="cardImage";
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }



}

// document.querySelector("#blackjack-deal-button").addEventListener("click",blackjackDeal);
function blackjackDeal() {

    if(blackjackGame["turnsOver"]==true){

        blackjackGame['isStand']=false;

        // let winner=computedWinner();
        // showResult(winner);
        // showResult(computedWinner());
        let yourImages=document.querySelector("#your-box").querySelectorAll("img");
        let dealerImages=document.querySelector("#dealer-box").querySelectorAll("img");
        // console.log(yourImage);

        for(var i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }

        for(var i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }

        YOU["score"]=0;
        DEALER["score"]=0;


        document.querySelector("#your-blackjack-result").textContent=0;
        document.querySelector("#your-blackjack-result").style.color="black";
        
        document.querySelector("#dealer-blackjack-result").textContent=0;
        document.querySelector("#dealer-blackjack-result").style.color="black";

        document.querySelector("#blackjack-result").textContent="Let's play";
        document.querySelector("#blackjack-result").style.color="black";

        blackjackGame["turnsOver"]=true;
    }
}





function sleep(ms){
    return new Promise(resolve =>setTimeout(resolve,ms));
}


// document.querySelector("#blackjack-stand-button").addEventListener("click",dealerLogic);
async function dealerLogic(){
    blackjackGame["isStand"]=true;

    while(DEALER["score"]<16 &&  blackjackGame["isStand"]===true){

    
        let card=randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    
        blackjackGame["turnsOver"]=true;
        let winner=computedWinner();
        showResult(winner);
    
    // if(DEALER["score"] >15){
    //     blackjackGame["turnsOver"]=true;
    //     let winner=computedWinner();
    //     showResult(winner);
    // }
    
}


// compute winner and return who just won
// update the wins draws losses

function computedWinner(){
    let winner;

    if(YOU["score"] <=21){
        //condition 1 :higher score than dealer or when dealer busts but your   doesn't
        if(YOU["score"]>DEALER["score"] || (DEALER["score"] >21) ){
            blackjackGame["wins"]++;
            winner=YOU;

        }else if(YOU["score"] <DEALER["score"] ){
            blackjackGame["losses"]++;
            winner=DEALER;

        }else if(YOU["score"] === DEALER["score"]){
            blackjackGame["draws"]++;
        }
    }else if(YOU["score"] >21 && DEALER["score"] <=21){
        //condition 2: when user bust but dealer doesn't
        blackjackGame["losses"]++;
        winner=DEALER;

        
    }else if(YOU["score"] >21 && DEALER["score"] >21){

        //condition 3: when you and dealer busts 
        blackjackGame["draws"]++;
    }   
    
    return winner;
}

function showResult(winner) {
    let message,messageColor;

    if(blackjackGame["turnsOver"]===true){

    

        if(winner ===YOU){
            document.querySelector("#wins").textContent=blackjackGame["wins"];
            message="You won!";
            messageColor="green";
            winSound.play();

        }
        else if(winner===DEALER){
            document.querySelector("#losses").textContent=blackjackGame["losses"];
            message="You lost!";
            messageColor="red";
            lossSound.play();
        }else{
            document.querySelector("#draws").textContent=blackjackGame["draws"];
            message="You drew!";
            messageColor="black";
        }

        document.querySelector("#blackjack-result").textContent=message;
        document.querySelector("#blackjack-result").style.color=messageColor;
    }
}