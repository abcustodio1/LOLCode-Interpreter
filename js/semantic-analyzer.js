const semantic_analyzer = (tokens) => {
  if(tokens[0].type === "Variable Declaration") return true;
  var functions = [ hai_kthxbye , print_statement_semantic , semantic_input, semantic_operator, infinite_logical_semantic, assignment_statement_semantic, semantic_smoosh, gtfo_semantic, explicit_typecasting_semantic];
  var result;

  for (let i = 0; i < functions.length; i++) {
      result = functions[i](tokens);

      if(result === BREAK) return BREAK;
      if (result === ERROR) return false;
      else if (result === FINISH) return true;

      if (result === PASS && i === functions.length - 1) {
        error_prompt("Semantic Error");
        return false;
      }
   }
}

const semantic_input = (tokens) => {
	switch(tokens[0].type) {
		case "Input Keyword":
		  return execute_input(tokens);
		default:
		  return PASS;
	}
}

const find_variable = (name) => {
  for (let i = 0; i < symbol_table.length; i++) {
    if (symbol_table[i].name === name) return i;
  }

  return -1;
}

const execute_input = (tokens) => {
  tokens.shift();

  var i = find_variable(tokens[0].lexeme);
  if (i !== -1) {
    var input = prompt("","");

    if (input === null) {
      error_prompt("Error: No Input");
      return ERROR;
    } else {
      symbol_table[i].type = "YARN";
      symbol_table[i].value = "\"" + input + "\"";
      
      return FINISH;
    }

  } else {
    error_prompt("ERROR! Uninitialized variable.");
    return ERROR;
  }
}

const execute_output = (tokens) => {
  var to_be_printed = symbol_table[0].value;
  while(to_be_printed.includes("\"")){
  	to_be_printed = to_be_printed.replace("\"", "");
  }
  while(to_be_printed.includes(" ")){
  	to_be_printed = to_be_printed.replace(" ", "&nbsp;");
  }
  document.getElementById("consoleArea").innerHTML += to_be_printed + "<br>";
  return FINISH;
}

const print_statement_semantic = (tokens) => {
  var it_string = [];

  if (tokens[0].type === "Output Keyword") {

    tokens.shift();

    if(tokens.length === 0){
      error_prompt("Expected Expression After VISIBLE");
      return ERROR;
    }

    while (tokens.length !== 0) {
      if (tokens[0].type.includes("Literal")) {
        it_string.push(tokens[0].lexeme);
        tokens.shift();
      } else if (tokens[0].type === "Variable Identifier") {
        var i = find_variable(tokens[0].lexeme);
        if (i === -1) {
          error_prompt("ERROR! Variable Uninitialized!");
          return ERROR;
        } else {
          it_string.push(symbol_table[i].value);
          tokens.shift();
        }
      } else {
        var check = operators_semantic(tokens);
        if (check === FINISH) {
          
          it_string.push(symbol_table[0].value);
          tokens = [];
        }else if (check === ERROR) return ERROR;
      }
    }

    if (tokens.length === 0) {
      
      for(let i = 0; i < it_string.length; ++i) it_string[i] = remove_quotes(it_string[i]);
      it_string = it_string.join(" ");
      symbol_table[0].value = "\"" + it_string + "\"";
      symbol_table[0].type = "YARN";
      execute_output(tokens);
      return FINISH;
    }
  } else return PASS;
}


const operators_semantic = (tokens) => {
    var functions = [ semantic_operator, infinite_logical_semantic, semantic_smoosh ];
    var result;
    for (let i = 0; i < functions.length; i++) {
      result = functions[i](tokens);

      if (result === ERROR) return ERROR;
      else if (result === FINISH) return FINISH;

      if (result === PASS && i === functions.length - 1) {
        error_prompt("NO OPERATOR Semantic function read!");
        return ERROR;
      }
    }
}


const assignment_statement_semantic = (tokens) => {
  var index = 0;
  if (tokens[0].type === "Variable Identifier") {
  	index = find_variable(tokens[0].lexeme);
    if (index === -1) {
      display("ERROR! Variable Uninitialized!");
      return ERROR;
    }
    if(tokens.length === 1){
      error_prompt("Expected R/IS NOW A after Variable");
      return ERROR;
    }
    if (tokens[1].type === "Value Assignment") {
      tokens.shift();
      tokens.shift();
      if(tokens.length === 0){
        error_prompt("Expected Expression after R");
        return ERROR;
      }
      if (tokens[0].type === "Variable Identifier"){
      	var i = find_variable(tokens[0].lexeme);
        if (i === -1) {
          error_prompt("ERROR! Variable Uninitialized!");
          return ERROR;
        } else {
          symbol_table[index].type = symbol_table[i].type;
          symbol_table[index].value = symbol_table[i].value;
        }
      	tokens.shift();
      }
      else if (tokens[0].type.includes("Literal")){
      	if (tokens[0].type === "YARN Literal") {
          symbol_table[index].type = "YARN";
          symbol_table[index].value = tokens[0].lexeme;
          tokens.shift();
        } else if (tokens[0].type === "NUMBR Literal") {
          symbol_table[index].type = "NUMBR";
          symbol_table[index].value = tokens[0].lexeme;
          tokens.shift();
        } else if (tokens[0].type === "NUMBAR Literal") {
          symbol_table[index].type = "NUMBAR";
          symbol_table[index].value = tokens[0].lexeme;
          symbol_table[index].shift();
        } else if (tokens[0].type === "TROOF Literal") {
          symbol_table[index].type = "TROOF";
          symbol_table[index].value = tokens[0].lexeme;
          tokens.shift();
        }
      }
      else {
        var check = operators_semantic(tokens);
        if (check === FINISH) {
          
          symbol_table[index].type = symbol_table[0].type;
          symbol_table[index].value = symbol_table[0].value;
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
    else return PASS; 
  } else return PASS;
}

const execute_if_else = (tokens) => {
  for (let i = 0; i < tokens.length; i++) {
    var res = semantic_analyzer(tokens[i]);

    if (!res) return false;
  }

  return true;
}

const execute_switch = tokens => {
  
  for (let i = 0; i < tokens.length; i++) {
    var res = semantic_analyzer(tokens[i]);

    if(res === BREAK) break;
    else if (!res) return false;
  }

  return true;
}



const explicit_typecasting_semantic = (tokens) => {
  if (tokens[0].type === "Variable Identifier") {
    if (tokens[1].type === "Explicit Typecasting for Variable") {

      let index = find_variable(tokens[0].lexeme);

      if (index === -1) {
        error_prompt("ERROR! Variable not found.");
        return ERROR;
      }

      tokens.shift();
      tokens.shift();
      if(tokens.length === 0){
        error_prompt("Expected Data Type");
        return ERROR;
      }

      if (tokens[0].type === "Data Type") {
        var value = "";
        if (tokens[0].lexeme === "NUMBR") value = parseInt(symbol_table[index].value);
        else if (tokens[0].lexeme === "NUMBAR") value = parseFloat(symbol_table[index].value);
        else if (tokens[0].lexeme === "YARN") value = "\"" + symbol_table[index].value.toString() + "\"";
        else if (tokens[0].lexeme === "TROOF") {
          if (symbol_table[index].type === "YARN") {
            if (symbol_table[index].value === "\"\"") value = "FAIL";
            else value = "WIN";
          } else if (symbol_table[index].type === "NUMBR" || symbol_table[index].type === "NUMBAR") {
            if (parseInt(symbol_table[index].value).toString() === "0") value = "FAIL";
            else value = "WIN";
          }
        }

        if (isNaN(value) && tokens[0].lexeme !== "TROOF" && tokens[0].lexeme !== "YARN") {
          error_prompt("Could not explicitly typecast variable.");
          return ERROR;
        }

        symbol_table[index].value = value.toString();
        symbol_table[index].type = tokens[0].lexeme;

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