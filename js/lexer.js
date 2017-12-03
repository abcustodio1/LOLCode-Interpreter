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
     pattern: /^".*"\s?/
 },
 {
     type: "Suppress New Line",
     pattern: /^!\s?/
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

  for(let i = 0; i < lines.length; ++i){
        if( /^\s+/.test(lines[i]) ) lines[i] = lines[i].replace(/^\s+/.exec(lines[i]), "");
    }

    // includes comma "," as statement breaker
    // in this code block, it ignores the commas inside yarns and in the comment strings (BTW)
    for(let i = 0; i < lines.length; ++i){
      if(lines[i].indexOf("\"") == -1 && lines[i].indexOf("BTW ") == -1){
        let statement = lines[i].split(",");
        for(let j = 0; j < statement.length; ++j){
          statement[j] = statement[j]
        }
        perLineData = perLineData.concat(statement);
      }
      else{
        let yarns = [];
        let btws = []
        while(lines[i].indexOf("BTW ") != -1){
          let result = /BTW\s+.*/.exec(lines[i]);
          btws.push(result[0]);
          lines[i] = lines[i].replace(result[0], "\n");
        }
        while(lines[i].indexOf("\"") != -1){
          let result = /"[^"]*"?/.exec(lines[i]);
          yarns.push(result[0]);
          lines[i] = lines[i].replace(result[0], "\t");
        }
        let statement = lines[i].split(",");
        let indexInYarn = 0;
        let indexInBTWS = 0;
        for(let j = 0; j < statement.length; ++j){
          while(statement[j].indexOf("\t") != -1){
          statement[j] = statement[j].replace("\t", yarns[indexInYarn]);
          ++indexInYarn;
        }
        while(statement[j].indexOf("\n") != -1){
          statement[j] = statement[j].replace("\n", btws[indexInBTWS]);
          ++indexInBTWS;
        }
        statement[j] = statement[j];
        }
        perLineData = perLineData.concat(statement)
      }
    }

    // removes extra indentations again
    for(let i = 0; i < perLineData.length; ++i){
        if( /^\s+/.test(perLineData[i]) ) perLineData[i] = perLineData[i].replace(/^\s+/.exec(perLineData[i]), "");
    }

    lines = perLineData.slice();
  
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
                      error_prompt("Error in this statement: " + result[0] + lines[0] + "<br> Unable to extract a lexeme");
                      error_flag = true;
                      break;
                  }
                  else if(result[0] === "!"){
                      error_prompt("Error in this statement: " + result[0] + lines[0] + "<br> Unable to extract a lexeme");
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
                  error_prompt("Error: " + result[0] + " is a Reserved Keyword<br>Invalid variable declaration");
                  error_flag = true;
                  break;
              }
              else if(regex[i].type.includes("Identifier")){
                  if(result[0].length > 64){
                      error_prompt("Error: Identifier \'"+ result[0] +"\'<br>Exceeds the maximum character length (which is 64)");
                      error_flag = true;
                      break;
                  }
              }
              if(regex[i].type === "YARN Literal"){
                let string = result[0].substring(1, result[0].length - 1);
                if(/:"/g.test(string)){
                    string = string.replace(/:"/g, "&quote;");
                    if(string.includes("\"")){
                      error_prompt("Invalid Character inside YARN");
                      error_flag = true;
                      break;
                    }
                    else{
                      string = string.replace(/&quote;/g, "\"");
                      result[0] = "\"" + string + "\"";
                    }
                }
              }
              if(/:\)/g.test(result[0])) result[0] = result[0].replace(/:\)/g, "\\n");
              if(/:>/g.test(result[0])) result[0] = result[0].replace(/:>/g, "\\t");
              if(/::/g.test(result[0])) result[0] = result[0].replace(/::/g, "\'");
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
                    error_prompt("OBTW Cannot co-exists with other statements");
                    error_flag = true;
                    break;
                  }
              }

              if(!multiLineCommentTrigger && result[0] === "TLDR"){
                if(tokens.length === 1){
                    error_prompt("Error: Opening \'OBTW\' for \'TLDR\' cannot be found");
                    error_flag = true;
                    break;
                }
                else{
                    error_prompt("TLDR Cannot co-exists with other statements");
                    error_flag = true;
                    break;
                }
              }

              if(result[0] === 'HAI'){
                  if(startDelimiter){
                     error_prompt("Error: Repeating Code Delimiter \'HAI\'");
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
                      error_prompt("Error: Repeating Code Delimiter \'KTHXBYE\'");
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
                      error_prompt("Error: Code Delimiter \'HAI\' not met before \'" + result[0] + "\'");
                      error_flag = true;
                      break;
                  }
              }
              if(startDelimiter && endDelimiter && !multiLineCommentTrigger && regex[i].type !== "Single-line Comment Keyword"){
                  if(result[0] !== "TLDR"){
                      if(result[0] !== "KTHXBYE"){
                          error_prompt("Error: \'"+ result[0] +"\' cannot be extracted<br>Code Delimiter \'KTHXBYE\' has already met");
                          error_flag = true;
                          break;
                      }
                  }
              }
              break;
          }
          else if(i === regex.length - 1){
              error_prompt("Error in this statement: " + lines[0] + "<br> Unable to extract a lexeme");
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
