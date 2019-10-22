
let tempstring='';
let result = 0;
const res = document.querySelector(".result");

function performMath(number1,number2,symbol){
    switch(symbol){
        case "\xD7":
            result = number1 * number2;
            break;
        case "\xF7":
            result = number1/number2;
            break;
        case "\u2212":
            result = number1 - number2;
            break;
        case "\u002B":
            result = number1 + number2;
            break;
    }
    tempstring = '';
}
function reset(){
    tempstring= '';
    result= 0;
}

function getResult(){
    const value = result ? result : tempstring ? tempstring : 0;
    res.innerText = value;
}
function goBackOne(){
    const len = tempstring.length
    tempstring =  tempstring.substring(0,len-1);
}
function processTempString(){
    let number1;
    let number2;
    for(let i=0; i<tempstring.length ;i++){
        if(isNaN(tempstring[i])){
            number1 = Number(tempstring.substring(0,i));
            number2 = Number(tempstring.substring(i+1,tempstring.length));
            performMath(number1, number2,tempstring[i]);
            break;
        }
    }
    tempstring = result;
}

  
function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
        if(event.target.innerText === "\u003D"){
            processTempString();
        } else if(event.target.innerText === "\u2190"){
            goBackOne();
        }
        else if(event.target.innerText ===  "C"){
            reset();
        }
        else {
            tempstring = tempstring + event.target.innerText;

        }
        getResult();
    });
}
  
init();