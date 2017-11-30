const ERROR = "ERROR";
const PASS = "PASS";
const FINISH = "FINISH";

const syntax_analyzer = (tokens) => {
  var functions = [ hai_kthxbye, operator, variable_declaration, print_statement, input_statement, assignment_statement, ifelse, switchcase, smoosh];
  var result;
  if(waiting){
    result = waiting_block(tokens); // call the waiting block which is ifelse or switchcase
    if(result === FINISH && !waiting){
        display("Block is correct");
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
        console.log("NO function read!");
        return false;
      }
    }
  }
}

const variable_declaration = (tokens) => {
  var symbol = {};

  if (tokens[0].type === "Variable Declaration") {

    tokens.shift();
    if (tokens[0].type === "Variable Identifier") {

      if (find_variable(tokens[0].lexeme) !== -1) {
        display("ERROR! Variable already initialized.");
        return ERROR;
      }

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
            display("ERROR! Expected data type!");
            return ERROR;
          }
        } else {
          var check = logical_operations(tokens);
          if (check === FINISH) {
            console.log("I HAS A statement with inner statements detected.");
            return FINISH;
          }else if (check === ERROR) return ERROR;
        }

        // catch cases if variable, statement, etc.

        tokens.shift();
        if (tokens.length === 0) {
          symbol_table.push(symbol);
          return FINISH;
        } else {
          display("ERROR! Unexpected identifier!");
          return ERROR;
        }

      } else {
        display("ERROR! Expected ITZ, not that.");
        return ERROR;
      }

    }

  } else return PASS;
}

const print_statement = (tokens) => {
  var it_string = [];

  if (tokens[0].type === "Output Keyword") {

    tokens.shift();

    while (tokens.length !== 0) {
      if (tokens[0].type.includes("Literal")) {
        it_string.push(tokens[0].lexeme);
        tokens.shift();
      } else if (tokens[0].type === "Variable Identifier") {
        var i = find_variable(tokens[0].lexeme);
        if (i === -1) {
          display("ERROR! Variable Uninitialized!");
          return ERROR;
        } else {
          it_string.push(symbol_table[i].value);
          tokens.shift();
        }
      } else {
        var check = logical_operations(tokens);
        if (check === FINISH) {
          console.log("VISIBLE statement with inner statements detected.");
          it_string.push("ANSWER");
          return FINISH;
        }else if (check === ERROR) return ERROR;
      }
    }

    if (tokens.length === 0) {
      console.log("VISIBLE statement encountered.");
      it_string = it_string.join("");
      symbol_table[0].value = it_string;
      symbol_table[0].type = "YARN";
      return FINISH;
    }
  } else return PASS;
}

const input_statement = (tokens) => {
  if (tokens[0].type === "Input Keyword") {
    tokens.shift();
    if (tokens[0].type === "Variable Identifier") {
      tokens.shift();

      if (tokens.length === 0) {
        console.log("GIMMEH statement detected.");
        return FINISH;
      } else {
        display("ERROR! Unexpected identifier!");
        return ERROR;
      }
    } else {
      display("ERROR! Expected Variable Identifier");
      return ERROR;
    }

  } else return PASS;
}

const assignment_statement = (tokens) => {
  if (tokens[0].type === "Variable Identifier") {
    tokens.shift();
    if (tokens[0].type === "Value Assignment") {
      tokens.shift();
      if (tokens[0].type === "Variable Identifier") tokens.shift();
      else if (tokens[0].type.includes("Literal")) tokens.shift();
      // catch statements
      else {
        var check = logical_operations(tokens);
        if (check === FINISH) {
          console.log("ASSIGNMENT statement with inner statements detected.");
          return FINISH;
        }else if (check === ERROR) return ERROR;
      }

      if (tokens.length === 0) {
        console.log("Assignment statement detected.");
        return FINISH;
      } else {
        display("ERROR! Unexpected identifier!");
        return ERROR;
      }
    } else return PASS;

  } else return PASS;
}

const logical_operations = (tokens) => {
  var stack = [];
  var tail;
  var types = ["Comparing Logical Operator", "Comparing Logical Operator (Negated)", "AND Logical Operator", "OR Logical Operator", "XOR Logical Operator", "NOT Logical Operator"];

  if (tokens[0].type.includes("Logical Operator")) {
    while (tokens.length !== 0) {
      tail = tokens.length - 1;
      if (tokens[tail].type === "NUMBR Literal") {
        console.log("Found literal.");
        stack.push(tokens[tail]);
        tokens.pop();
        console.log(stack);
      } else {

        for (let i = 0; i < types.length; i++) {
          if (tokens[tail].type === "NOT Logical Operator") {
            if (stack.length === 0) {
              console.log("ERROR! Nothing to pop!");
              return ERROR;
            } else stack.pop();

            stack.push("ANSWER");

            tokens.pop();
            console.log(stack);
            break;
          } else if (tokens[tail].type === types[i]) {
            if (stack.length === 0) {
              console.log("ERROR! Nothing to pop!");
              return ERROR;
            } else stack.pop();

            if (stack.length === 0) {
              console.log("ERROR! Needs one more to pop!");
              return ERROR;
            } else stack.pop();

            stack.push("ANSWER");

            tokens.pop();
            console.log(stack);
            break;
          } else if (i === types.length - 1) {
            display("ERROR! Unknown Identifier");
            return ERROR;
          }
        }
      }
    }

    if (stack.length > 1) {
      display("ERROR! Unexpected something.");
      return ERROR;
    } else {
      console.log("Successful.");
      return FINISH;
    }
  } else return PASS;
}
