let output = document.getElementById('output');
function display(num){
    output.value += num;
}
function Calculate(){
    try{
        let temp = output.value.replace('÷', '/');
        output.value = eval(temp);
    }
    catch(err){
        alert('Wrong Input');
    }
}
function Clear(){
    output.value = "";
}
function del(){
    output.value = output.value.slice(0, -1);
}

window.addEventListener('keydown', function (e) {
    //console.log(`You pressed ${e.key}`);
    if((e.key >= 0 && e.key <= 9) || e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == '.'){
        if(e.key == '/')
            output.value += '÷';
        else output.value += e.key;
    }
    else if(e.key == 'Backspace'){
        output.value = output.value.slice(0, -1);
    }
    else if(e.key == 'Enter'){
        try{
            let temp = output.value.replace('÷', '/');
            output.value = eval(temp);
        }
        catch(err){
            alert('Wrong Input');
        }
    }
});