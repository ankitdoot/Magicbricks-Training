var rounds = 0;
var score1 = 0;
var score2 = 0;
var flag = 0;

function diceroll(){
    rounds++;
    let num1 = Math.floor(Math.random()*6)+1;
    let num2 = Math.floor(Math.random()*6)+1;
    document.getElementById('dice1res').innerHTML = num1;
    document.getElementById('dice2res').innerHTML = num2;
    updateScore(num1, num2);
    if(rounds == 3 || score1 >= 4 || score2 >= 4){//update
        document.getElementById('dicebutton').style.pointerEvents = 'none';
        displayResult();
        document.getElementById('playagain').style.display = 'block';
    }
}

function updateScore(num1, num2){
    if(num1 + num2 == 7){
        score1 += 1;
        score2 += 1;
            document.getElementById('player1score').innerHTML = score1;
            document.getElementById('player2score').innerHTML = score2;
        
    }
    else if(num1 + num2 > 7){
        if(flag == 0){
            score1 += 2;
            document.getElementById('player1score').innerHTML = score1;
        }
        else{
            score2 += 2;
            document.getElementById('player2score').innerHTML = score2;
        }
    }
    else {
        if(flag == 0){
            score2 += 2;
            document.getElementById('player2score').innerHTML = score2;
        }
        else{
            score1 += 2;
            document.getElementById('player1score').innerHTML = score1;
        }
    }
}
function displayResult(){
    if(score1 == score2){
        document.getElementById('winner').innerHTML = 'Draw';
    }
    else if(score1 > score2 && flag == 0){
        document.getElementById('winner').innerHTML = 'Player 1 Winner';
    }
    else if(score1 < score2 && flag == 1){
        document.getElementById('winner').innerHTML = 'Player 2 Winner';
    }
    else if(score1 < score2 && flag == 0){
        document.getElementById('winner').innerHTML = 'Player 2 Winner';
    }
    else {
        document.getElementById('winner').innerHTML = 'Player 1 Winner';
    }
}

function resetgame(){
    rounds = 0;
    score1 = 0;
    score2 = 0;
    flag = !(flag);
    document.getElementById('player1score').innerHTML = 0;
    document.getElementById('player2score').innerHTML = 0;
    document.getElementById('dice1res').innerHTML = '';
    document.getElementById('dice2res').innerHTML = '';
    document.getElementById('winner').innerHTML = '';
    document.getElementById('playagain').style.display = 'none';
    document.getElementById('dicebutton').style.pointerEvents = 'auto';
    if(flag == 1){
        document.getElementById('p1score').innerHTML = "Score: Player1(<7)";
        document.getElementById('p2score').innerHTML = "Score: Player2(>7)";
    }
    else if(flag == 0){
        document.getElementById('p1score').innerHTML = "Score: Player1(>7)";
        document.getElementById('p2score').innerHTML = "Score: Player2(<7)";
    }
}