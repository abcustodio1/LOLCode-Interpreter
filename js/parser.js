const ERROR = "ERROR";
const PASS = "PASS";
const FINISH = "FINISH";
const BREAK = "BREAK";

const syntax_analyzer = (tokens) => {
  var functions = [ hai_kthxbye, operator, variable_declaration, print_statement, input_statement, assignment_statement, ifelse, switchcase, smoosh, infinite_logical, explicit_typecasting];
  var result;
  if(waiting){
    result = waiting_block(tokens); // call the waiting block which is ifelse or switchcase
    if(result === FINISH && !waiting){
        return true;
    }
    else if(result === ERROR){
      return false;
    }
    else{
      return true;
    }
  }
  else{
    for (let i = 0; i < functions.length; i++) {
      result = functions[i](tokens);

      if (result === ERROR) return false;
      else if (result === FINISH) return true;

      if (result === PASS && i === functions.length - 1) {
        error_prompt("Syntax Error");
        return false;
      }
    }
  }
}

const variable_declaration = (tokens) => {
  var symbol = {};

  if (tokens[0].type === "Variable Declaration") {

    tokens.shift();
    if (tokens.length === 0){
        error_prompt("Expected Variable after I HAS A");
        return ERROR;
    }
    if (tokens[0].type === "Variable Identifier") {

      if (find_variable(tokens[0].lexeme) !== -1) {
        display("ERROR! Variable already initialized.");
        return ERROR;
      }

      symbol = {
        name: tokens[0].lexeme,
        type: "NOOB",
        value: ""
      };

      tokens.shift();
      if (tokens.length === 0){
        symbol_table.push(symbol);
        return FINISH;
      }
      if (tokens[0].type === "Variable Assignment") {

        tokens.shift();
        if (tokens.length === 0){
          error_prompt("Expected Expression after ITZ");
          return ERROR;
        }
        if (tokens[0].type === "YARN Literal") {
          symbol.type = "YARN";
          symbol.value = tokens[0].lexeme;
          tokens.shift();
        } else if (tokens[0].type === "NUMBR Literal") {
          symbol.type = "NUMBR";
          symbol.value = tokens[0].lexeme;
          tokens.shift();
        } else if (tokens[0].type === "NUMBAR Literal") {
          symbol.type = "NUMBAR";
          symbol.value = tokens[0].lexeme;
          tokens.shift();
        } else if (tokens[0].type === "TROOF Literal") {
          symbol.type = "TROOF";
          symbol.value = tokens[0].lexeme;
          tokens.shift();
          /*if (tokens[0].lexeme === "WIN") symbol.value = true;
          else symbol.value = false;*/
        } else if (tokens[0].type === "Type Operator") {
          tokens.shift();
          if (tokens[0].type === "Data Type") symbol.type = tokens[0].lexeme;
          else {
            display("ERROR! Expected data type!");
            return ERROR;
          }
        } else if (tokens[0].type.includes("Identifier")) {
            var i = find_variable(tokens[0].lexeme);
            if (i === -1) {
              display("ERROR! Variable Uninitialized!");
              return ERROR;
            } else {
              symbol.type = symbol_table[i].type;
              symbol.value = symbol_table[i].value;
              tokens.shift();
            }
        } else {
          var tokens_copy = tokens.slice();
          var check = operators(tokens);
          if (check === FINISH) {
            check = operators_semantic(tokens_copy);
            if(check === FINISH){
              
              symbol.type = symbol_table[0].type;
              symbol.value = symbol_table[0].value;
              tokens = [];
            }
            else{
              return ERROR;
            }
          }else if (check === ERROR) return ERROR;
        }

        // catch cases if variable, statement, etc.

        if (tokens.length === 0) {
          symbol_table.push(symbol);
          return FINISH;
        } else {
          error_prompt("ERROR! Unexpected identifier!");
          return ERROR;
        }

      } else {
        error_prompt("ERROR! Expected ITZ, not that.");
        return ERROR;
      }

    }
    else{
      error_prompt("Expected Variable after I HAS A");
      return ERROR;
    }

  } else return PASS;
}


const print_statement = (tokens) => {

  if (tokens[0].type === "Output Keyword") {

    tokens.shift();

    if(tokens.length === 0){
      error_prompt("Expected Expression After VISIBLE");
      return ERROR;
    }

    while (tokens.length !== 0) {
      if (tokens[0].type.includes("Literal")) {
        // it_string.push(tokens[0].lexeme);
        tokens.shift();
      } else if (tokens[0].type === "Variable Identifier") {
        /*var i = find_variable(tokens[0].lexeme);
        if (i === -1) {
          display("ERROR! Variable Uninitialized!");
          return ERROR;
        } else {
          it_string.push(symbol_table[i].value);
          tokens.shift();
        }*/
        tokens.shift();
      } else {
        var check = operators(tokens);
        if (check === FINISH) {
          
          tokens = [];
          return FINISH;
        }else if (check === ERROR) return ERROR;
      }
    }

    if (tokens.length === 0) {
      
      return FINISH;
    }
  } else return PASS;
}

const operators = (tokens) => {
    var functions = [ operator , infinite_logical, smoosh ];
    var result;
    for (let i = 0; i < functions.length; i++) {
      result = functions[i](tokens);

      if (result === ERROR) return ERROR;
      else if (result === FINISH) return FINISH;

      if (result === PASS && i === functions.length - 1) {
        error_prompt("NO OPERATOR function read!");
        return ERROR;
      }
    }
}

const input_statement = (tokens) => {
  if (tokens[0].type === "Input Keyword") {
    tokens.shift();
    if(tokens.length === 0){
      error_prompt("Expected Variable GIMMEH");
      return ERROR;
    }
    if (tokens[0].type === "Variable Identifier") {
      tokens.shift();

      if (tokens.length === 0) {
        
        return FINISH;
      } else {
        error_prompt("ERROR! Unexpected identifier!");
        return ERROR;
      }
    } else {
      error_prompt("ERROR! Expected Variable Identifier");
      return ERROR;
    }

  } else return PASS;
}

const assignment_statement = (tokens) => {
  if (tokens[0].type === "Variable Identifier") {
    // tokens.shift();
    if(tokens.length === 1){
      error_prompt("Expected R or IS NOW A after Variable");
      return ERROR;
    }
    if (tokens[1].type === "Value Assignment") {
      tokens.shift();
      tokens.shift();
      if(tokens.length === 0){
        error_prompt("Expected Expression after R");
        return ERROR;
      }
      if (tokens[0].type === "Variable Identifier") tokens.shift();
      else if (tokens[0].type.includes("Literal")) tokens.shift();
      // catch statements
      else {
        var check = operators(tokens);
        if (check === FINISH) {
          
          return FINISH;
        }else if (check === ERROR) return ERROR;
      }

      if (tokens.length === 0) {
        
        return FINISH;
      } else {
        error_prompt("ERROR! Unexpected identifier!");
        return ERROR;
      }
    } /*else return PASS;*/
    else{
      return PASS;
    }
    // else return PASS;
  } else return PASS;
}


const explicit_typecasting = (tokens) => {
  if (tokens[0].type === "Variable Identifier") {
    if (tokens[1].type === "Explicit Typecasting for Variable") {

     /* let index = find_variable(tokens[0].lexeme);

      if (index === -1) {
        display("ERROR! Variable not found.");
        return ERROR;
      }*/

      tokens.shift();
      tokens.shift();
      if(tokens.length === 0){
        error_prompt("Expected Data Type");
        return ERROR;
      }

      if (tokens[0].type === "Data Type") {
        /*var value = "";
        if (tokens[0].lexeme === "NUMBR") value = parseInt(symbol_table[index].value);
        else if (tokens[0].lexeme === "NUMBAR") value = parseFloat(symbol_table[index].value);
        else if (tokens[0].lexeme === "YARN") value = "\"" + symbol_table[index].value.toString() + "\"";
        else if (tokens[0].lexeme === "TROOF") {
          if (symbol_table[index].type === "YARN") {
            if (symbol_table[index].value === "\"\"") value = "FAIL";
            else value = "WIN";
          } else if (symbol_table[index].type === "NUMBR" || symbol_table[index].type === "NUMBAR") {
            if (symbol_table[index].value === 0) value = "FAIL";
            else value = "WIN";
          }
        }

        if (isNaN(value) && tokens[0].lexeme !== "TROOF" && tokens[0].lexeme !== "YARN") {
          error_prompt("Could not explicitly typecast variable.");
          return ERROR;
        }

        symbol_table[index].value = value.toString();
        symbol_table[index].type = tokens[0].lexeme;*/

        tokens.shift();

        if (tokens.length > 0) {
          error_prompt("Unexpected identifier.");
          return ERROR;
        } else return FINISH;
      } else {
        error_prompt("ERROR! Expected Data Type.");
        return ERROR;
      }

    } else return PASS;
  } else return PASS;
}
