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
}
function reset(){
    tempstring= '';
    result= 0;
}

function getResult(){
    symbols = symbolsAt();
    const value = result && symbols.length === 0 ? result : tempstring ? tempstring : 0;
    res.innerText = value;
}
function goBackOne(){
    const len = tempstring.length
    tempstring =  tempstring.substring(0,len-1);
}

function symbolsAt(){
let symbolsAtPosition = [];
for(let i=0; i<tempstring.length ;i++){
    if(isNaN(tempstring[i])){
        symbolsAtPosition=symbolsAtPosition.concat(i);
    }
}
return symbolsAtPosition;
}
function processTempString(){
    const symbols = symbolsAt();
    let number2;
    if(symbols.length === 0){
        result = tempstring;
    }
    else if(symbols.length===1){
        console.log('coming 1')

        symbolIndex = symbols[0];
        symbol = tempstring[symbolIndex];
        const number1 = Number(tempstring.substring(0,symbolIndex));
        number2 = Number(tempstring.substring(symbolIndex+1,tempstring.length));
        performMath(number1, number2 ,symbol);
    }
    else {
      
        let  number1 = Number(tempstring.substring(0,symbols[0]));
        let symbolIndex1 = symbols[0];
        let symbolIndex2;
        for(let j=1; j <= symbols.length ; j++){
            symbolIndex2 = symbols[j];
            symbolIndex2 = symbols[j];
            symbol = tempstring[symbolIndex1];
            number2 = Number(tempstring.substring(symbolIndex1+1,symbolIndex2));
            performMath(number1, number2 ,symbol);          
            number1 = result;
            symbolIndex1 = symbolIndex2;
                
        }
    }
    
    tempstring=result;
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