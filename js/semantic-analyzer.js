const semantic_analyzer = (tokens) => {
  switch(tokens[0].type) {
    case "Input Keyword":
      execute_input(tokens);
      break;
    case "Output Keyword":
      execute_output(tokens);
      break;
    default:
      console.log("PASS");
  }

  return true;
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
      console.log("Error");
    } else {
      symbol_table[i].type = "YARN";
      symbol_table[i].value = input;
      console.log("GIMMEH is semantically correct.");
      return FINISH;
    }

  } else {
    display("ERROR! Uninitialized variable.");
    return false;
  }
}

const execute_output = (tokens) => {
  document.getElementById("consoleArea").innerHTML += symbol_table[0].value + "<br>";
}
