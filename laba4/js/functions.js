
function checkPalindrom(str) {
    var vadlidString = str.split(' ').join('').toLowerCase();
    //console.log(vadlidString)
    return vadlidString == vadlidString.split('').reverse().join('');
}

function isNumeric(char){
    if (char >= '0' && char <='9')
        return true;
    return false;
}
function  printNumber(str){
    var vadlidString = str.split(' ').join('').toLowerCase();
    var ans = "";
    for (i = 0; i < vadlidString.length; i++)
    {
        if (isNumeric(vadlidString[i])){
            ans+=vadlidString[i];
        }
    }

    if (ans.length==0){
        return ("NaN");
    }

    return ans;
}

function padStringToLength(input, n, newChar){
    var ans = "";
    append = 0;
    for(i = 0; i < (n - input.length); i++)
    {
        if(newChar.length-1 < append){
            append = 0;
        }
        ans = ans + newChar[append];
        append++;
    }
    return ans + input;
}

function lengthValid(input, n){
    return (input.length <= n) ? true : false;
}
