var board =[['', '', ''],
            ['', '', ''],
            ['', '', '']];
var count = 0;
function tictac(num){
    let divid = `div${num}`;
    let row = Math.floor(num/3);
    let column = num%3;
    console.log('row : ', row, ' column : ', column);
    if(board[row][column] == '✕' || board[row][column] == 'O'){
        console.log(board[row][column]);
        return;
    }
    else{
        displaySign(divid, row, column);
        count++;
        if(count >= 5){
            //for rows
            for(let i = 0; i < 3; i++){
                if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && (board[i][0] == '✕' || board[i][0] == 'O')){
                    //console.log('here1', i);
                    document.getElementById('result').innerHTML = `Player ${(count-1)%2} won`;
                    removeClick();
                    document.getElementById('restartbtn').style.display = 'block';
                    return;
                }
            }
            //for columns
            for(let i = 0; i < 3; i++){
                if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && (board[0][i] == '✕' || board[0][i] == 'O')){
                    //console.log('here2');
                    document.getElementById('result').innerHTML = `Player ${(count-1)%2} won`;
                    removeClick();
                    document.getElementById('restartbtn').style.display = 'block';
                    return;
                }
            }
            //for diagonals
            if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && (board[0][0] == '✕' || board[0][0] == 'O')){
                //console.log('here3');
                document.getElementById('result').innerHTML = `Player ${(count-1)%2} won`;
                removeClick();
                document.getElementById('restartbtn').style.display = 'block';
                return;
            }
            if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && (board[2][0] == '✕' || board[2][0] == 'O')){
                //console.log('here4');
                document.getElementById('result').innerHTML = `Player ${(count-1)%2} won`;
                removeClick();
                document.getElementById('restartbtn').style.display = 'block';
                return;
            }
        }
        if(count == 9){
            document.getElementById('result').innerHTML = "Match Draw";
            removeClick();
        }   
    }
}

function displaySign(divid, row, column){
    if(count%2){
        document.getElementById(divid).style.color = "#f2ebd3";
        document.getElementById(divid).innerHTML = "O";
        board[row][column] = '✕';
    }
    else{
        document.getElementById(divid).style.color = "#545454";
        document.getElementById(divid).innerHTML = "✕";
        board[row][column] = 'O'
    }
}

function removeClick(){
    for(let i = 0; i < 9; i++){
        document.getElementById(`div${i}`).style.pointerEvents = 'none';
        //var elem  = document.getElementById(`div${i}`);
        //elem.removeAttribute("onclick");
    }
}

function resetGame(){
    board =[['', '', ''],
            ['', '', ''],
            ['', '', '']];
    count = 0;
    document.getElementById('result').innerHTML = '';
    document.getElementById('restartbtn').style.display = 'none';
    for(let i = 0; i < 9; i++){
        document.getElementById(`div${i}`).innerHTML = '';
        //document.getElementById(`div${i}`).addEventListener('click', tictac);//arrow func
        document.getElementById(`div${i}`).style.pointerEvents = 'auto';
    }
}