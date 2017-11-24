var regex = [
 {
     type: "Code Delimiter",
     pattern: /^\s*HAI\s?/
 },
 {
     type: "Code Delimiter",
     pattern: /^\s*KTHXBYE\s?/
 },
 {
     type: "Variable Declaration",
     pattern: /^I\s+HAS\s+A\s?/
 },
 {
     type: "Variable Assignment",
     pattern: /^ITZ\s?/
 },
 {
     type: "TROOF Literal",
     pattern: /^(WIN|FAIL)\s?/
 },
 {
     type: "Data Type",
     pattern: /^(NUMBR|NUMBAR|TROOF|YARN|NOOB)\s?/
 },
 {
     type: "Value Assignment",
     pattern: /^R\s?/
 },
 {
     type: "Addition Arithmetic Operator",
     pattern: /^SUM\s+OF\s?/
 },
 {
     type: "Subtraction Arithmetic Operator",
     pattern: /^DIFF\s+OF\s?/
 },
 {
     type: "Multiplication Arithmetic Operator",
     pattern: /^PRODUKT\s+OF\s?/
 },
 {
     type: "Division Arithmetic Operator",
     pattern: /^QUOSHUNT\s+OF\s?/
 },
 {
     type: "Modulo Arithmetic Operator",
     pattern: /^MOD\s+OF\s?/
 },
 {
     type: "MAX Operator",
     pattern: /^BIGGR\s+OF\s?/
 },
 {
     type: "MIN Operator",
     pattern: /^SMALLR\s+OF\s?/
 },
 {
     type: "AND Logical Operator",
     pattern: /^BOTH\s+OF\s?/
 },
 {
     type: "OR Logical Operator",
     pattern: /^EITHER\s+OF\s?/
 },
 {
     type: "XOR Logical Operator",
     pattern: /^WON\s+OF\s?/
 },
 {
     type: "Infinite Arrity AND Operator",
     pattern: /^ALL\s+OF\s?/
 },
 {
     type: "Infinite Arrity OR Operator",
     pattern: /^ANY\s+OF\s?/
 },
 {
     type: "NOT Logical Operator",
     pattern: /^NOT\s?/
 },
 {
     type: "Multiple Arrity Conjunctor",
     pattern: /^AN\s?/
 },
 {
     type: "Multiple Arrity Ender",
     pattern: /^MKAY\s?/
 },
 {
     type: "Comparing Logical Operator",
     pattern: /^BOTH\s+SAEM\s?/
 },
 {
     type: "Comparing Logical Operator (Negated)",
     pattern: /^DIFFRINT\s?/
 },
 {
     type: "String Concat Operator",
     pattern: /^SMOOSH\s?/
 },
 {
     type: "Explicit Typecasting for Expression",
     pattern: /^MAEK\s?/
 },
 {
     type: "Type Operator",
     pattern: /^A\s?/
 },
 {
     type: "Explicit Typecasting for Variable",
     pattern: /^IS\s+NOW\s+A\s?/
 },
 {
     type: "Output Keyword",
     pattern: /^VISIBLE\s?/
 },
 {
     type: "Input Keyword",
     pattern: /^GIMMEH\s?/
 },
 {
     type: "IF Statement Start Keyword",
     pattern: /^O\s+RLY\s*\?\s?/
 },
 {
     type: "IF TRUE Block Keyword",
     pattern: /^YA\s+RLY\s?/
 },
 {
     type: "ELSE Block Keyword",
     pattern: /^NO\s+WAI\s?/
 },
 {
     type: "ELSE IF Block Keyword",
     pattern: /^MEBBE\s?/
 },
 {
     type: "IF or Switch Case Statement End Keyword",
     pattern: /^OIC\s?/
 },
 {
     type: "Switch Case Start Keyword",
     pattern: /^WTF\?\s?/
 },
 {
     type: "Switch Cases Keyword",
     pattern: /^OMG\s?/
 },
 {
     type: "Break Keyword",
     pattern: /^GTFO\s?/
 },
 {
     type: "Default Cases Keyword",
     pattern: /^OMGWTF\s?/
 },
 {
     type: "Loop Start Keyword",
     pattern: /^IM\s+IN\s+YR\s?/
 },
 {
     type: "Increment Keyword",
     pattern: /^UPPIN\s+YR\s?/
 },
 {
     type: "Decrement Keyword",
     pattern: /^NERFIN\s+YR\s?/
 },
 {
     type: "Until Keyword",
     pattern: /^TIL\s?/
 },
 {
     type: "While Keyword",
     pattern: /^WILE\s?/
 },
 {
     type: "Loop End Keyword",
     pattern: /^IM\s+OUTTA\s+YR\s?/
 },
 {
     type: "Single-line Comment Keyword",
     pattern: /^BTW\s?/
 },
 {
     type: "Multi-line Comment Start Keyword",
     pattern: /^OBTW\s?/
 },
 {
     type: "Multi-line Comment End Keyword",
     pattern: /^TLDR\s?/
 },
 {
     type: "Variable Identifier",
     pattern: /^[A-Za-z][A-Za-z0-9_]*\s?/
 },
 {
     type: "NUMBAR Literal",
     pattern: /^-?[0-9]*\.[0-9]+\s?/
 },
 {
     type: "NUMBR Literal",
     pattern: /^-?[0-9]+\s?/
 },
 {
     type: "YARN Literal",
     pattern: /^"[^"]*"\s?/
 }
];
var lines;
var multiLineCommentTrigger = false;
var startDelimiter = false;
var endDelimiter = false;


const get_lines = () => {
  var wholeCode = document.getElementById('codeArea').value;
  // replace \t with \s
  while(wholeCode.indexOf("\t") != -1){
      wholeCode = wholeCode.substr(0, wholeCode.indexOf("\t")) + " " + wholeCode.substr(wholeCode.indexOf("\t") + 1);
  }

  // arrays for tokens
  var tokens = [];
  var perLineData = [];
  lines = wholeCode.split("\n");

  // remove extra indentations
  for(let i = 0; i < lines.length; ++i){
    if( /^\s+/.test(lines[i])) {
      lines[i] = lines[i].replace(/^\s+/.exec(lines[i]), "");
    }
  }
}

const lexical_analyzer = () => {
  var result;
  var tokens = [];

  while(lines[0] !== ""){
      var error_flag = false;
      for(let i = 0; i < regex.length; ++i){
          result = regex[i].pattern.exec(lines[0]);

          if(result !== null){
              lines[0] = lines[0].replace(result[0], "");
              if( /^\s+/.test(lines[0]) ) lines[0] = lines[0].replace(/^\s+/.exec(lines[0]), "");
              if(multiLineCommentTrigger){
                  if(result[0] === "TLDR" || result[0] === "TLDR "){
                      if(result[0] === "TLDR"){
                          if(lines[0] === ""){
                            multiLineCommentTrigger = false;
                            token_table("<tr><td>" + result[0] + "</td><td>" + regex[i].type + "</td></tr>");
                            break;
                          } 
                          else{
                              lines[0] = "";
                              break;      
                          }
                      }
                      else{
                          multiLineCommentTrigger = false;
                          token_table("<tr><td>" + result[0] + "</td><td>" + regex[i].type + "</td></tr>");
                          break;    
                      }
                  }
                  else{
                      lines[0] = "";
                      break;
                  }
              }

              if(result[0][result[0].length - 1] === " ") result[0] = result[0].slice(0, -1);

              else if(lines[0] !== ""){
                  if( result[0].includes("\"") ) {
                      display("<font color='red'><br>Error in this statement: " + result[0] + lines[0] + "<br> Unable to extract a lexeme</font>");
                      error_flag = true;
                      break;
                  }
                  else {
                      lines[0] = result[0] + lines[0];
                      continue;
                  }
              }

              // checks if there's an IT variable declared
              if(result[0] === "IT"){
                  display("<font color='red'><br>Error: " + result[0] + " is a Reserved Keyword<br>Invalid variable declaration</font>");
                  error_flag = true;
                  break;
              }
              else if(regex[i].type.includes("Identifier")){
                  if(result[0].length > 64){
                      display("<font color='red'><br> Error: Identifier \'"+ result[0] +"\'<br>Exceeds the maximum character length (which is 64)</font>");
                      error_flag = true;
                      break;
                  }
              }

              tokens.push({lexeme: result[0], type: regex[i].type});
              token_table("<tr><td>" + tokens[tokens.length - 1].lexeme + "</td><td>" + tokens[tokens.length - 1].type + "</td></tr>");

              if(result[0] === "BTW"){
                  lines[0] = "";
                  tokens.pop();
                break;
              }
              else if (result[0] === "OBTW"){
                  if(tokens.length === 1){
                    multiLineCommentTrigger = true;
                    lines[0] = "";
                    tokens.pop();
                    break;
                  }
                  else{
                    display("OBTW Cannot co-exists with other statements");
                    error_flag = true;
                    break;
                  }
              }

              if(!multiLineCommentTrigger && result[0] === "TLDR"){
                if(tokens.length === 1){
                    display("<font color='red'><br>Error: Opening \'OBTW\' for \'TLDR\' cannot be found</font>");
                    error_flag = true;
                    break;
                }
                else{
                    display("TLDR Cannot co-exists with other statements");
                    error_flag = true;
                    break;
                }
              }

              if(result[0] === 'HAI'){
                  if(startDelimiter){
                     display("<font color='red'><br>Error: Repeating Code Delimiter \'HAI\'</font>");
                      error_flag = true;
                      //tokens.pop();
                      break;
                  }
                  else{
                    hasToken = true;
                    startDelimiter = true;
                    //tokens.pop();
                  }
              }

              if(result[0] === "KTHXBYE"){
                  if(endDelimiter){
                      display("<font color='red'><br>Error: Repeating Code Delimiter \'KTHXBYE\'</font>");
                      error_flag = true;
                      //tokens.pop();
                      break;   
                  }
                  else{
                    hasToken = true;
                    endDelimiter = true;
                    //tokens.pop();
                  }
              }

              if(!startDelimiter && !multiLineCommentTrigger && regex[i].type !== "Single-line Comment Keyword"){
                  if(result[0] !== "TLDR"){
                      display("<font color='red'><br>Error: Code Delimiter \'HAI\' not met before \'" + result[0] + "\'</font>");
                      error_flag = true;
                      break;
                  }
              }
              if(startDelimiter && endDelimiter && !multiLineCommentTrigger && regex[i].type !== "Single-line Comment Keyword"){
                  if(result[0] !== "TLDR"){
                      if(result[0] !== "KTHXBYE"){
                          display("<font color='red'><br> Error: \'"+ result[0] +"\' cannot be extracted<br>Code Delimiter \'KTHXBYE\' has already met</font>");
                          error_flag = true;
                          break;
                      }
                  }
              }
              break;
          }
          else if(i === regex.length - 1){
              display("<font color='red'><br>Error in this statement: " + lines[0] + "<br> Unable to extract a lexeme</font>");
              error_flag = true;
              break;
          }
      } 
      if(error_flag) break;
  }
  lines.shift();
  if(error_flag) return ERROR;
  else return tokens;
}
