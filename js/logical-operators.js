
var log_stack = [];
var bool_stack = [];
var log_tos = -1;
var bool_tos = -1;
var DUMMY = "result";


const syntax_logical = (tokens) => {
	var operators = ["AND Logical Operator", "OR Logical Operator", "XOR Logical Operator", "Comparing Logical Operator", "Comparing Logical Operator (Negated)", "NOT Logical Operator"];
	var an_flag = false;
	// if the first operator is there
	if(operators.includes(tokens[0].type)){
		log_stack.push({operator: tokens[0].type, operands: 0, max: (tokens[0].type === "NOT Logical Operator" ? 1 : 2)}); // push operator
		++log_tos;
		// display("Pushed into Log-Stack: " + tokens[0].lexeme);
		for(let i = 1; i < tokens.length; ++i){
			// check if an_flag is true
			if(an_flag){
				// if operator
				if(operators.includes(tokens[i].type)){
					log_stack.push({operator: tokens[i].type, operands: 0, max: (tokens[i].type === "NOT Logical Operator" ? 1 : 2)}); // push operator
					++log_tos;
					// display("Pushed into Log-Stack: " + tokens[i].lexeme);
					an_flag = false;
				}
				// check if its literal or variable
				else if(tokens[i].type.includes("Literal") || tokens[i].type.includes("Identifier")){
					bool_stack.push(tokens[i].type) // push literal
					++bool_tos;
					// display("Pushed into Boolean-Stack: " + tokens[i].lexeme);
					if(log_tos !== -1) ++log_stack[log_tos].operands;
					an_flag = false;
				}

				// otherwise, throw error
				else{
					display("Expected Literal/Variable or Operator after AN");
					log_stack = [];
					log_tos = -1;
					bool_stack = [];
					bool_tos = -1;
					return {status: ERROR, next: 0};
				}
			}
			// if AN and there's one operand
			else if(tokens[i].type === "Multiple Arrity Conjunctor"){
				if(log_tos === -1 || log_stack[log_tos].operands === 1){
					// display("See AN");
					an_flag = true;
					// continue;
				}
				// return error
				else{
					display("Expected value before AN");
					log_stack = [];
					log_tos = -1;
					bool_stack = [];
					bool_tos = -1;
					return {status: ERROR, next: 0};
				}
			}
			// if operator
			else if(operators.includes(tokens[i].type)){
				// throw error
				if(log_tos !== -1 && log_stack[log_tos].operands === 1){
					display("Expected AN before " + tokens[i].lexeme);
					log_stack = [];
					log_tos = -1;
					bool_stack = [];
					bool_tos = -1;
					return {status: ERROR, next: 0};
				}
				else{
					log_stack.push({operator: tokens[i].type, operands: 0, max: (tokens[i].type === "NOT Logical Operator" ? 1 : 2)}); // push operator
					++log_tos;
					// display("Pushed into Log-Stack: " + tokens[i].lexeme);
				}
			}
			// if literal or variable
			else if(tokens[i].type.includes("Literal") || tokens[i].type.includes("Identifier")){
				if(log_tos !== -1 && log_stack[log_tos].operands === 1){
					display("Expected AN before " + tokens[i].lexeme);
					log_stack = [];
					log_tos = -1;
					bool_stack = [];
					bool_tos = -1;
					return {status: ERROR, next: 0};
				}
				else{
					bool_stack.push(tokens[i].type) // push literal
					++bool_tos;
					// display("Pushed into Boolean-Stack: " + tokens[i].lexeme);
					if(log_tos !== -1) ++log_stack[log_tos].operands;
				}
			}
			// else not a valid syntax, throw error
			else{
				display("Invalid start of " + tokens[i].lexeme);
				log_stack = [];
				log_tos = -1;
				bool_stack = [];
				bool_tos = -1;
				return {status: ERROR, next: 0};
			}

			// check if the operator at tos of log_stack has already 2 operands
			if(log_tos !== -1){
				while(log_stack[log_tos].operands === log_stack[log_tos].max){
					//pop last 2 operands
					let popped = bool_stack.pop(); // (2nd operand)
					--bool_tos;
					// display("Popped from Boolean-Stack: " + popped);
					if(log_stack[log_tos].max !== 1){
						popped = bool_stack.pop(); // (1st operand)
						--bool_tos;
						// display("Popped from Boolean-Stack: " + popped);
					}
					popped = log_stack.pop(); // pop the operator in tos
					--log_tos;
					// display("Popped from Log-Stack: " + popped.operator);
					bool_stack.push(DUMMY); // push result of the operations (DUMMY in this case)
					++bool_tos;
					// display("Pushed into Log-Stack: result");
					if(log_tos === -1) break;
					log_stack[log_tos].operands += 1; // and add operand count for the latest operator
				} 
			}

			// if there's only one operand and no operators left
			if(log_stack.length === 0 && bool_stack.length === 1 && i === tokens.length - 1){
				// display("Without NEXT");
				log_stack = [];
				log_tos = -1;
				bool_stack = [];
				bool_tos = -1;
				return {status: FINISH, next: i + 1};
			}

			// otherwise, throw error
			else if(log_stack.length === 0){
				// display("With NEXT");
				log_stack = [];
				log_tos = -1;
				bool_stack = [];
				bool_tos = -1;
				return {status: FINISH, next: i + 1};
			}

			else if(i === tokens.length - 1){
				display("Insufficient Operands for " + log_stack[log_tos].operator);
				log_stack = [];
				log_tos = -1;
				bool_stack = [];
				bool_tos = -1;
				return {status: ERROR, next: 0};
			}
			
		}

		if(log_stack.length === 1 && bool_stack.length === 0){
			display("Expected Literal/Variable/Operator after " + log_stack[log_tos].operator);
			log_stack = [];
			log_tos = -1;
			bool_stack = [];
			bool_tos = -1;
			return {status: ERROR, next: 0};
		}
	}

	// check if only literal or variable
	else if(tokens[0].type.includes("Literal") || tokens[0].type.includes("Identifier")){
		// display("Detected Literal/ Variable");
		return {status: FINISH, next: 1}
	}

	// otherwise, ret pass
	else{
		display("Invalid start of " + tokens[0].lexeme)
		return {status: ERROR, next: 0};
	}
}