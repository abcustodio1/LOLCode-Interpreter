'use strict';

var ifelse_stack = [];
var ifelse_tos = -1;
var waiting = false;
var waiting_block = null;
var yarlyflag = false;
var nowaiflag = false;

// returns true if no syntax error encountered
// otherwise, returns ERROR
const ifelse = (tokens) => {
	var ifelse_components = ["IF TRUE Block Keyword", "ELSE Block Keyword", "IF or Switch Case Statement End Keyword"];
	// If O RLY?
	if(tokens[0].type === "IF Statement Start Keyword"){
		// if ifelse_stack is empty, push O RLY?
		if(ifelse_stack.length === 0){
			ifelse_stack.push(tokens[0].type);//push O RLY?
			++ifelse_tos;
			display("Pushed into Stack: " + tokens[0].lexeme);
			tokens.shift();
			waiting = true;
			waiting_block = ifelse;
		}
		// otherwise, throws error
		else{
			display("Invalid Start of O RLY?")
			return ERROR;
		}
	}
	else if(ifelse_stack.length !== 0){
		// if YA RLY
		if(tokens[0].type === "IF TRUE Block Keyword"){
			// check if ifelse_tos is O RLY?
			if(ifelse_stack[ifelse_tos] === "IF Statement Start Keyword"){
				yarlyflag = true;
				nowaiflag = false;
				ifelse_stack.push(tokens[0].type);
				++ifelse_tos;
				display("Pushed into Stack: " + tokens[0].lexeme);
				tokens.shift();
			}
			// if not O RLY? Throw error
			else{
				display("Expected YA RLY");
				return ERROR;
			}
		}

		//if NO WAI
		else if(tokens[0].type === "ELSE Block Keyword"){
			// if YA RLY
			if(ifelse_stack[ifelse_tos] === "IF TRUE Block Keyword"){
				nowaiflag = true;
				yarlyflag = false;
				display("Popped from Stack: " + ifelse_stack.pop());// pop YA RLY
				--ifelse_tos;
				ifelse_stack.push(tokens[0].type);// push NO WAI
				++ifelse_tos
				display("Pushed into Stack: " + tokens[0].lexeme);
				tokens.shift();
			}
			// if not YA RLY, Throw error
			else{
				display("Expected YA RLY Before NO WAI");
				return ERROR;
			}
		}

		// if OIC
		else if(tokens[0].type === "IF or Switch Case Statement End Keyword"){
			// check if ifelse_tos is O RLY, throws error
			if(ifelse_stack[ifelse_tos] === "IF Statement Start Keyword"){
				display("Expected YA RLY Before OIC");
				return ERROR;
			}
			// check if ifelse_tos is YA RLY
			else if(ifelse_stack[ifelse_tos] === "IF TRUE Block Keyword"){
				display("Popped from Stack: " + ifelse_stack.pop());// pop YA RLY
				--ifelse_tos;
				display("Popped from Stack: " + ifelse_stack.pop());// pop O RLY?
				--ifelse_tos;
				tokens.shift();
				waiting = false;
				waiting_block = null;

				var temp;
				if (symbol_table[0].value === "WIN") temp = execute_if_else(statement_stack_if);
				else temp = execute_if_else(statement_stack_else);

				statement_stack_if = [];
				statement_stack_else = [];

				if (temp) return FINISH;
				else return ERROR;
			}
			// check if ifelse_tos is NO WAI
			else if(ifelse_stack[ifelse_tos] === "ELSE Block Keyword"){
				display("Popped from Stack: " + ifelse_stack.pop());// pop NO WAI
				--ifelse_tos;
				display("Popped from Stack: " + ifelse_stack.pop());// pop O RLY?
				--ifelse_tos;
				tokens.shift();
				waiting = false;
				waiting_block = null;

				var temp;
				if (symbol_table[0].value === "WIN") temp = execute_if_else(statement_stack_if);
				else temp = execute_if_else(statement_stack_else);

				statement_stack_if = [];
				statement_stack_else = [];

				if (temp) return FINISH;
				else return ERROR;
			}
			// if none satisfies, throw an error
			else{
				display("Missing O RLY?");
				return ERROR;
			}
		}

		// for statement calls
		else {
			if(ifelse_stack[ifelse_tos] === "IF TRUE Block Keyword" || ifelse_stack[ifelse_tos] === "ELSE Block Keyword"){
				// call statement function
				return statement_block(tokens);
			}
			// if it is not under YA RLY or NO WAI, throw error
			else{
				display("Expected YA RLY before " + tokens[0].lexeme);
				return ERROR;
			}
		}

	}
	// if ifelse_stack is empty, meaning it has no O RLY?
	else {
		if(ifelse_components.includes(tokens[0].type)){
			display("Illegal Start of " + tokens[0].lexeme);
			return ERROR;
		}
		else{
			// display("If-else is NOT the proper syntax checker")
			return PASS;
			// insert here that it is ifelse is not the proper syntax checker
			//
		}
	}

	// checks if there's other statements(except BTW), if yes, throws error
	if(tokens.length !== 0 && tokens[0].type !== "Single-line Comment Keyword"){
		display("Expected Line Break before " + tokens[0].lexeme);
		return ERROR;
	}
	return FINISH;
}

var statement_stack_if = [];
var statement_stack_else = [];

const statement_block = (tokens) => {
	/*tokens = [];
	return FINISH;*/
	var statements = [variable_declaration, print_statement, operator, smoosh];
	var result;
	for (let i = 0; i < statements.length; i++) {
      result = statements[i](tokens);

      if (result === ERROR) return ERROR;
      else if (result === FINISH) {
				if (yarlyflag) statement_stack_if.push(tokens_cpy);
				else if (nowaiflag) statement_stack_else.push(tokens_cpy);
				return FINISH;
			}

      if (result === PASS && i === statements.length - 1) {
        display("Not Allowed inside Conditional Blocks");
        return ERROR;
      }
    }

	//this includes all operators (Logical and Arithmetic) and Variable Assignments (Not Declaration)
}


const display = (message) => {
	document.getElementById("consoleArea").innerHTML += ("<br>" + message);
}
