function func2(){
    console.log("in func2, value of temp :", temp)
}

function func1(){
    
    var temp = 0;
    //console.log("in func2", temp)
    func2()
}

var temp = 1
func1()