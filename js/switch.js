'use strict';

var switchcase_stack = [];
var switchcase_tos = -1;
var statement_stack_switch = [];
var found = false;
var it_value;

const switchcase = (tokens) => {
	var switch_components = ["Switch Cases Keyword", "Default Cases Keyword", "Break Keyword", "IF or Switch Case Statement End Keyword"];
	// if WTF?
	if(tokens[0].type === "Switch Case Start Keyword"){
		it_value = symbol_table[0].value;
		if(switchcase_stack.length === 0){
			switchcase_stack.push(tokens[0].type); //push WTF?
			++switchcase_tos;
			display("Pushed into Case-Stack: " + tokens[0].lexeme);
			waiting = true;
			tokens.shift();
			waiting_block = switchcase;
		}
		// if the stack is not empty, throw an error
		else{
			display("Illegal Start of WTF?");
			return ERROR;
		}
	}
	else if(switchcase_stack.length !== 0){
		// check if OMG
		if(tokens[0].type === "Switch Cases Keyword"){
			// check if there's a possible literal
			if(tokens.length > 1 && tokens[1].type.includes("Literal")){
				// if tos is WTF?
				if(switchcase_stack[switchcase_tos] === "Switch Case Start Keyword"){
					if (found === true) found = false;

					console.log(tokens[1].lexeme);
					console.log(symbol_table);
					console.log(it_value);

					if (tokens[1].lexeme === it_value) {
						found = true;
						console.log("IN!" + tokens[1].lexeme);
					}

					switchcase_stack.push(tokens[0].type); //push OMG
					++switchcase_tos;
					display("Pushed into Case-Stack: " + tokens[0].lexeme);
					tokens.shift(); // remove OMG
					tokens.shift(); // remove literal
				}
				// if tos is OMG
				else if(switchcase_stack[switchcase_tos] === "Switch Cases Keyword"){
					let popped = switchcase_stack.pop(); // pop OMG
					--switchcase_tos;
					display("Popped from Case-Stack: " + popped);
					switchcase_stack.push(tokens[0].type) // push OMG
					++switchcase_tos;
					display("Pushed into Case-Stack: " + tokens[0].lexeme);
					tokens.shift();
					tokens.shift();

				}
				// otherwise throw an error
				else{
					display("Illegal Start of OMG after " + switchcase_stack[switchcase_tos]);
					return ERROR;
				}
			}

			// throws error since there's no literal
			else{
				display("Literal Expected after OMG");
				return ERROR;
			}
		}

		// if OMGWTF
		else if(tokens[0].type === "Default Cases Keyword"){
			// if tos is OMG
			if(switchcase_stack[switchcase_tos] === "Switch Cases Keyword"){
				let popped = switchcase_stack.pop(); // pop OMG
				--switchcase_tos;
				display("Popped from Case-Stack: " + popped);
				switchcase_stack.push(tokens[0].type) // push OMGWTF
				++switchcase_tos;
				display("Pushed into Case-Stack: " + tokens[0].lexeme);
				tokens.shift();
				tokens.shift();
			}
			// otherwise, throws error
			else{
				display("Illegal Start of OMGWTF after " + switchcase_stack[switchcase_tos]);
				return ERROR;
			}
		}
		// if OIC
		else if(tokens[0].type === "IF or Switch Case Statement End Keyword"){
			// if tos is WTF?, throws error
			if(switchcase_stack[switchcase_tos] === "Switch Case Start Keyword"){
				display("Expected OMG before OIC");
				return ERROR;
			}
			// if tos is OMG or OMGWTF
			else if(switchcase_stack[switchcase_tos] === "Switch Cases Keyword" || switchcase_stack[switchcase_tos] === "Default Cases Keyword"){
				let popped = switchcase_stack.pop(); // pop OMG or OMGWTF
				--switchcase_tos;
				display("Popped from Case-Stack: " + popped);
				popped = switchcase_stack.pop(); // pop WTF?
				--switchcase_tos;
				display("Popped from Case-Stack: " + popped);
				tokens.shift();
				waiting = false;
				waiting_block = null;

				execute_switch(statement_stack_switch);
			}
			// if none satisfies, throws an error
			else{
				display("Missing WTF?");
				return ERROR;
			}
		}

		// statement calls
		else{
			// if tos if OMG or OMGWTF
			if(switchcase_stack[switchcase_tos] === "Switch Cases Keyword" || switchcase_stack[switchcase_tos] === "Default Cases Keyword"){
				return statement_block_wtf(tokens);
			}
			// if not under OMG or OMGWTF, throws error
			else{
				display("Expected OMG before " + tokens[0].lexeme);
				return ERROR;
			}
		}
	}

	// if the stack is empty, meaning it has no WTF?
	else{
		// if OMG, OMGWTF, OIC, GTFO, throws error
		if(switch_components.includes(tokens[0].type)){
			display("Illegal Start of " + tokens[0].lexeme);
			return ERROR;
		}
		else{
			// display("Switch-case is NOT the proper syntax checker")
			return PASS;
			// insert here that it is switchcase is not the proper syntax checker
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


const gtfo = (tokens) => {
	// if GTFO
	if(tokens[0].type === "Break Keyword"){
		tokens.shift();
	}
	else{
		return PASS;
	}

	// checks if there's other statements(except BTW), if yes, throws error
	if(tokens.length !== 0 && tokens[0].type !== "Single-line Comment Keyword"){
		display("Expected Line Break before " + tokens[0].lexeme);
		return ERROR;
	}
	return FINISH;
}


const statement_block_wtf = (tokens) => {
	/*tokens = [];
	return FINISH;*/
	var statements = [gtfo, variable_declaration, print_statement, operator, smoosh];
	var result;
	for (let i = 0; i < statements.length; i++) {
      result = statements[i](tokens);

      if (result === ERROR) return ERROR;
			else if (result === FINISH) {
				if (found) statement_stack_switch.push(tokens_cpy);
				return FINISH;
			}

      if (result === PASS && i === statements.length - 1) {
        display("Not Allowed inside Conditional Blocks");
        return ERROR;
      }
    }

	//this includes all operators (Logical and Arithmetic) and Variable Assignments (Not Declaration)

}
