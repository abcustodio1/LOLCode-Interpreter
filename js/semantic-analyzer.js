const semantic_analyzer = (tokens) => {
  if(tokens[0].type === "Variable Declaration") return true;
  var functions = [ hai_kthxbye , semantic_input_output, semantic_operator, infinite_logical_semantic];
  var result;
  for (let i = 0; i < functions.length; i++) {
      result = functions[i](tokens);

      if (result === ERROR) return false;
      else if (result === FINISH) return true;

      if (result === PASS && i === functions.length - 1) {
        console.log("NO function read!");
        return false;
      }
   }
}

const semantic_input_output = (tokens) => {
	switch(tokens[0].type) {
		case "Input Keyword":
		  return execute_input(tokens);
		case "Output Keyword":
		  return execute_output(tokens);
		default:
		  return PASS;
	}

	return FINISH;
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
      console.log("Error: No Input");
      return ERROR;
    } else {
      symbol_table[i].type = "YARN";
      symbol_table[i].value = input;
      console.log("GIMMEH is semantically correct.");
      return FINISH;
    }

  } else {
    display("ERROR! Uninitialized variable.");
    return ERROR;
  }
}

const execute_output = (tokens) => {
  document.getElementById("consoleArea").innerHTML += symbol_table[0].value + "<br>";
}
