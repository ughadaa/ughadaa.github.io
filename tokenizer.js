   


class Token{
    type = "";
    value = "";
    lineNumber = 1;
    position = -1;
}

const digits = "0123456789"
const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const whitespaces = "\t\n";
const symbols = "$(){}[].><=;+-"
const tag = ["<?","?>","php"]
const keywords = ['let', 'var', 'const', 'function',
 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'break',
'continue', 'default', 'case', 'echo', 'console', 'log']

function tokenizer(value){
    if(value.length == 0){
        return []
    }

    let current = 0;
    let tokens = [];
    let currentToken = [];
    let currentLineNumber = 1;
    let currentPosition = 0;

    let token = null;

    while(current < value.length){
        currentToken = []
        
        token = new Token()
        token.position = current;
        token.lineNumber = currentLineNumber;

        /* id token */
        if(alpha.includes(value[current]) || value[current] == '_'){
            token.type = "identifier"

            currentToken.push(value[current++]);
            while(alpha.includes(value[current]) ||
                 digits.includes(value[current])
                 || value[current] == '_'){
                     currentToken.push(value[current++])
                 }
        }else if(digits.includes(value[current])){
            token.type = "number"
            currentToken.push(value[current++]);
            while(digits.includes(value[current])){
                    currentToken.push(value[current++])
            }
        }else if(whitespaces.includes(value[current])){
            token.type = "whitespace"
            if(value[current] == '\n'){
                currentLineNumber++;
            }

            currentToken.push(value[current++]);
            while(whitespaces.includes(value[current])){
                    currentToken.push(value[current++])
            }
        }
        else if(value[current] == '<' && value[current + 1] == '?'){
            current += 2; //skip <?>
            token.type = "tag"

            while(value[current] != '\n' && current < value.length){
                currentToken.push(value[current++])
            }
        }
        else if(symbols.includes(value[current])){
            token.type = "symbol"
            currentToken.push(value[current++]);
        }else if(value[current] == '/' && value[current + 1] == '/'){
            //current += 2; //skip //
            token.type = "comment"

            while(value[current] != '\n' && current < value.length){
                currentToken.push(value[current++])
            }
        }
        
        else{
            token.type = "error"
            token.value = value[current++]
            tokens.push(token)
            continue;
        }

        
        token.value = currentToken.join('') 
        if(token.type == 'identifier' && 
         keywords.includes(token.value)){
             token.type = "keyword";
         }
        
        tokens.push(token)
    }

    return tokens;
}



function toBeTokenized() {

    let toBeTokenizedText = document.getElementById("myInput").value;
    let highlightedText = "";

    let tokens = tokenizer(toBeTokenizedText)
    highlightedText += 1 + ". "

    for(token of tokens){
    if(token.type == "keyword"){
        highlightedText += `<span style="color: #91C4F2; font-size: 100%;">${token.value}</span>`;
    }
    else if(token.type == "tag"){
        highlightedText += `<span style="color: #982649; font-size: 100%;"> ${token.value}</span>`;

    }

    else if(token.type == "identifier"){
        highlightedText += `<span style="color: #EFAAC4; font-size: 100%;">${token.value}</span>`;

    }else if(token.type == "symbol"){
        highlightedText += `<span style="color: #D4DCCD; font-size: 100%;">${token.value}</span>`;

    }else if(token.type == "number"){
        highlightedText += `<span style="color: #FFB30F; font-size: 100%;">${token.value}</span>`;
     
     }else if(token.type == "whitespace"){
        highlightedText += token.value.replace("\n", "<br>")//.replace(" ", "&nbsp;")
        highlightedText += token.lineNumber + 1 + ". "
     }else if(token.type == "comment"){
        highlightedText += `<span style="color: #A5B452; font-size: 100%;">${token.value}</span>`;

     }else if(token.type == "error"){
        highlightedText += `<span style="color: #982649; font-size: 100%;">${token.value}</span>`;
     
     }
     else{
        highlightedText += token.value
     }
}

document.getElementById("demo").innerHTML =  highlightedText + '<img src="images/line.gif" style="width: 1px; height: 20px;"/>';

}


function wr(){
var elem = document.getElementById("wrappers");

elem.scrollTop = elem.scrollHeight;
}

