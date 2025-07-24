import fs, { linkSync } from "fs";

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
const lines = fileContent.split('\n');

var Tokens = [];
var invalid_captures = [];
function recognize_token_type(char,atline){
  switch(char){
    case '(': addToken(char, "LEFT_PAREN",atline); break;
    case ')': addToken(char, "RIGHT_PAREN",atline); break;
    case '{': addToken(char, "LEFT_BRACE",atline); break;
    case '}': addToken(char, "RIGHT_BRACE",atline); break;
    case '.': addToken(char, "DOT", atline); break;
    case ',': addToken(char, "COMMA", atline ); break;
    case '+': addToken(char, "PLUS", atline); break;
    case '-': addToken(char, "MINUS", atline); break;
    case '*': addToken(char, "STAR", atline); break;
    case '/': addToken(char, "SLASH", atline); break;
    case ';': addToken(char, "SEMICOLON", atline); break;
    case '=': addToken(char, "EQUAL", atline); break;
    case '!': addToken(char, "BANG", atline); break;
    case '<': addToken(char, "LESS", atline); break;
    case '>': addToken(char, "GREATER", atline); break;
    case '==': addToken(char, "EQUAL_EQUAL", atline); break;
    case '!=': addToken(char, "BANG_EQUAL", atline); break;
    case '<=': addToken(char, "LESS_EQUAL", atline); break;
    case '>=': addToken(char, "GREATER_EQUAL", atline); break;
    case ' ' : break; 
    case '\t' : break; 
    case '\n' : break;
    default : 
      invalid_captures.push({
        line : atline,
        token : char
      })
  }
}


function addToken(Token, TokenType, atline){
  Tokens.push({
    line : atline,
    token : Token,
    type : TokenType,
    literal : null
  })
}
 
if (fileContent.length !== 0) {
  for(let i = 0; i < lines.length; i++){
    let line = lines[i];
    for(let j = 0; j<line.length; j++){
      let token = line.charAt(j);
      if(token === '=' && j <line.length-1 && line.charAt(j+1)==='='){
        recognize_token_type("==", i+1);
        j++;
      }else if(token === '!' && j <line.length-1 && line.charAt(j+1)==='=' ){
        recognize_token_type("!=",i+1);
        j++;
      }else if(token === '<' && j <line.length-1 && line.charAt(j+1)==='=' ){
        recognize_token_type("<=",i+1);
        j++;
      }else if(token === '>' && j <line.length-1 && line.charAt(j+1)==='=' ){
        recognize_token_type(">=",i+1);
        j++;
      }else if(token === '/' && j <line.length-1 && line.charAt(j+1)==='/' ){
        break;
      }else if(token === '"' && j <line.length-1 && line.charAt(j+1)==='=' ){
        j++;
      }
      else recognize_token_type(token,i+1);
    }
  }

  if(invalid_captures.length!==0){
    invalid_captures.forEach(invalidCapture =>{
      console.error(`[line ${invalidCapture.line}] Error: Unexpected character: ${invalidCapture.token}\n`) ;
    })
  }
  Tokens.forEach(element => {
    console.log(`${element.type} ${element.token} ${element.literal}`);
  });

}

console.log("EOF  null");
if(invalid_captures.length!==0)
  process.exit(65);
