import fs from "fs";

// Skip the first two arguments (node path and script path)
const args = process.argv.slice(2); 

if (args.length < 2) {
  console.error("Usage: ./your_program.sh tokenize <filename>");
  process.exit(1);
}

const command = args[0];

if (command !== "tokenize") {
  console.error(`Usage: Unknown command: ${command}`);
  process.exit(1);
}

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.error("Logs from your program will appear here!");

const filename = args[1];
const fileContent = fs.readFileSync(filename, "utf8");
var Tokens = [];
var invalid_captures = [];
function recognize_token_type(char){
  switch(char){
    case '(': addToken(char, "LEFT_PAREN"); break;
    case ')': addToken(char, "RIGHT_PAREN"); break;
    case '{': addToken(char, "LEFT_BRACE"); break;
    case '}': addToken(char, "RIGHT_BRACE"); break;
    case '.': addToken(char, "DOT"); break;
    case ',': addToken(char, "COMMA"); break;
    case '+': addToken(char, "PLUS"); break;
    case '-': addToken(char, "MINUS"); break;
    case '*': addToken(char, "STAR"); break;
    case '/': addToken(char, "SLASH"); break;
    case ';': addToken(char, "SEMICOLON"); break;
    case '=': addToken(char, "EQUAL"); break;
    case '!': addToken(char, "BANG"); break;
    case '<': addToken(char, "LESS"); break;
    case '>': addToken(char, "GREATER"); break;
    case '==': addToken(char, "EQUAL_EQUAL"); break;
    case '!=': addToken(char, "BANG_EQUAL"); break;
    case '<=': addToken(char, "LESS_EQUAL"); break;
    case '>=': addToken(char, "GREATER_EQUAL"); break;
    case ' ' : break; 
    case "\v" : break; 
    default : 
      invalid_captures.push(char)
  }
}


function addToken(Token, TokenType){
  Tokens.push({
    token : Token,
    type : TokenType,
    literal : null
  })
}
 
if (fileContent.length !== 0) {
  for(let i = 0; i < fileContent.length; i++){
    let token = fileContent.charAt(i);
    if(token === '=' && i <fileContent.length-1 && fileContent.charAt(i+1)==='='){
      recognize_token_type("==");
      i++;
    }else if(token === '!' && i <fileContent.length-1 && fileContent.charAt(i+1)==='=' ){
      recognize_token_type("!=");
      i++;
    }else if(token === '<' && i <fileContent.length-1 && fileContent.charAt(i+1)==='=' ){
      recognize_token_type("<=");
      i++;
    }else if(token === '>' && i <fileContent.length-1 && fileContent.charAt(i+1)==='=' ){
      recognize_token_type(">=");
      i++;
    }else if(token === '/' && i <fileContent.length-1 && fileContent.charAt(i+1)==='/' ){
      break;
    }else recognize_token_type(token);
  }

  if(invalid_captures.length!==0){
    invalid_captures.forEach(invalidCapture =>{
      console.error(`[line 1] Error: Unexpected character: ${invalidCapture}\n`) ;
    })
  }
  Tokens.forEach(element => {
    console.log(`${element.type} ${element.token} ${element.literal}`);
  });

}

console.log("EOF  null");
if(invalid_captures.length!==0)
  process.exit(65);
