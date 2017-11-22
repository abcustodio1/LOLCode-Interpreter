const ERROR = "ERROR";
const PASS = "PASS";
const FINISH = "FINISH";

const syntax_analyzer = (tokens) => {
  var functions = [variable_declaration, print_statement];
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

const variable_declaration = (tokens) => {
  var symbol = {};


  if (tokens[0].type === "Variable Declaration") {

    tokens.shift();
    if (tokens[0].type === "Variable Identifier") {
      symbol = {
        name: tokens[0].lexeme,
        type: "NOOB",
        value: null
      };

      tokens.shift();
      if (tokens.length === 0){
        symbol_table.push(symbol);
        return FINISH;
      }
      if (tokens[0].type === "Variable Assignment") {

        tokens.shift();
        if (tokens[0].type === "YARN Literal") {
          symbol.type = "YARN";
          symbol.value = tokens[0].lexeme;
        } else if (tokens[0].type === "NUMBR Literal") {
          symbol.type = "NUMBR";
          symbol.value = parseInt(tokens[0].lexeme);
        } else if (tokens[0].type === "NUMBAR Literal") {
          symbol.type = "NUMBAR";
          symbol.value = parseFloat(tokens[0].lexeme);
        } else if (tokens[0].type === "TROOF Literal") {
          symbol.type = "TROOF";
          if (tokens[0].lexeme === "WIN") symbol.value = true;
          else symbol.value = false;
        } else if (tokens[0].type === "Type Operator") {
          tokens.shift();
          if (tokens[0].type === "Data Type") symbol.type = tokens[0].lexeme;
          else {
            console.log("ERROR! Expected data type!");
            return ERROR;
          }
        }

        // catch cases if variable, statement, etc.

        tokens.shift();
        if (tokens.length === 0) {
          symbol_table.push(symbol);
          return FINISH;
        } else {
          console.log("ERROR! Unexpected identifier!");
          return ERROR;
        }

      } else {
        console.log("ERROR! Expected ITZ, not that.");
        return ERROR;
      }

    }

  } else return PASS;
}

const print_statement = (tokens) => {
  if (tokens[0].type === "Output Keyword") {

    tokens.shift();
    if (tokens[0].type.includes("Literal")) tokens.shift();
    else if (tokens[0].type === "Variable Identifier") tokens.shift();
    // catch statement

    if (tokens.length === 0) {
      console.log("VISIBLE statement encountered.");
      return FINISH;
    } else {
      console.log("ERROR! Unexpected Identifier!");
      return ERROR;
    }

  } else return PASS;
}
