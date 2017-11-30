
var logic_stack = [];
var boolean_stack = [];
var logic_tos = -1;
var boolean_tos = -1;


const semantic_logical = (tokens) => {
	var operators = ["AND Logical Operator", "OR Logical Operator", "XOR Logical Operator", "Comparing Logical Operator", "Comparing Logical Operator (Negated)", "NOT Logical Operator"];
	var an_flag = false;
	// if the first operator is there
	if(operators.includes(tokens[0].type)){
		logic_stack.push({operator: tokens[0].type, operands: 0, max: (tokens[0].type === "NOT Logical Operator" ? 1 : 2)}); // push operator
		++logic_tos;
		// display("Pushed into Log-Stack: " + tokens[0].lexeme);
		for(let i = 1; i < tokens.length; ++i){
			// check if an_flag is true
			if(an_flag){
				// if operator
				if(operators.includes(tokens[i].type)){
					logic_stack.push({operator: tokens[i].type, operands: 0, max: (tokens[i].type === "NOT Logical Operator" ? 1 : 2)}); // push operator
					++logic_tos;
					// display("Pushed into Log-Stack: " + tokens[i].lexeme);
					an_flag = false;
				}
				// check if its literal or variable
				else if(tokens[i].type.includes("Literal") || tokens[i].type.includes("Identifier")){
					if(tokens[i].type.includes("Identifier")){
						let index = find_variable(tokens[i].lexeme);
						if(index === -1){
							display("Cannot find Identifier " + tokens[i].lexeme);
							logic_stack = [];
							logic_tos = -1;
							boolean_stack = [];
							boolean_tos = -1;
							return {status: ERROR, next: 0};
						}
						else{
							boolean_stack.push(symbol_table[index].value) // push value of variable
							++boolean_tos;	
						}						
					}
					else{
						boolean_stack.push(tokens[i].lexeme) // push literal
						++boolean_tos;
						
					}
					// display("Pushed into Boolean-Stack: " + boolean_stack[boolean_tos]);
					if(logic_tos !== -1) ++logic_stack[logic_tos].operands;
					an_flag = false;
				}

				// otherwise, throw error
				else{
					display("Expected Literal/Variable or Operator after AN");
					logic_stack = [];
					logic_tos = -1;
					boolean_stack = [];
					boolean_tos = -1;
					return {status: ERROR, next: 0};
				}
			}
			// if AN and there's one operand
			else if(tokens[i].type === "Multiple Arrity Conjunctor"){
				if(logic_tos === -1 || logic_stack[logic_tos].operands === 1){
					// display("See AN");
					an_flag = true;
					// continue;
				}
				// return error
				else{
					display("Expected value before AN");
					logic_stack = [];
					logic_tos = -1;
					boolean_stack = [];
					boolean_tos = -1;
					return {status: ERROR, next: 0};
				}
			}
			// if operator
			else if(operators.includes(tokens[i].type)){
				// throw error
				if(logic_tos !== -1 && logic_stack[logic_tos].operands === 1){
					display("Expected AN before " + tokens[i].lexeme);
					logic_stack = [];
					logic_tos = -1;
					boolean_stack = [];
					boolean_tos = -1;
					return {status: ERROR, next: 0};
				}
				else{
					logic_stack.push({operator: tokens[i].type, operands: 0, max: (tokens[i].type === "NOT Logical Operator" ? 1 : 2)}); // push operator
					++logic_tos;
					// display("Pushed into Log-Stack: " + tokens[i].lexeme);
				}
			}
			// if literal or variable
			else if(tokens[i].type.includes("Literal") || tokens[i].type.includes("Identifier")){
				if(logic_tos !== -1 && logic_stack[logic_tos].operands === 1){
					display("Expected AN before " + tokens[i].lexeme);
					logic_stack = [];
					logic_tos = -1;
					boolean_stack = [];
					boolean_tos = -1;
					return {status: ERROR, next: 0};
				}
				else{
					if(tokens[i].type.includes("Identifier")){
						let index = find_variable(tokens[i].lexeme);
						if(index === -1){
							display("Cannot find Identifier " + tokens[i].lexeme);
							return {status: ERROR, next: 0};
						}
						else{
							boolean_stack.push(symbol_table[index].value) // push value of variable
							++boolean_tos;	
						}						
					}
					else{
						boolean_stack.push(tokens[i].lexeme) // push literal
						++boolean_tos;
						
					}
					// display("Pushed into Boolean-Stack: " + boolean_stack[boolean_tos]);
					if(logic_tos !== -1) ++logic_stack[logic_tos].operands;
				}
			}
			// else not a valid syntax, throw error
			else{
				display("Invalid start of " + tokens[i].lexeme);
				logic_stack = [];
				logic_tos = -1;
				boolean_stack = [];
				boolean_tos = -1;
				return {status: ERROR, next: 0};
			}

			// check if the operator at tos of logic_stack has already 2 operands
			if(logic_tos !== -1){
				while(logic_stack[logic_tos].operands === logic_stack[logic_tos].max){
					//pop last 2 operands
					var first_operand = null;
					var second_operand = boolean_stack.pop(); // (2nd operand)
					--boolean_tos;
					// display("Popped from Boolean-Stack: " + second_operand);
					if(logic_stack[logic_tos].max !== 1){
						first_operand = boolean_stack.pop(); // (1st operand)
						--boolean_tos;
						// display("Popped from Boolean-Stack: " + first_operand);
					}
					operation_used = logic_stack.pop(); // pop the operator in tos
					--logic_tos;
					// display("Popped from Log-Stack: " + operation_used.operator);
					var result = execute_operation(operation_used.operator, first_operand, second_operand);
					if(result === ERROR){
						logic_stack = [];
						logic_tos = -1;
						boolean_stack = [];
						boolean_tos = -1;
						return {status: ERROR, next: 0};
					}
					boolean_stack.push(result); // push result of the operations (DUMMY in this case)
					++boolean_tos;
					// display("Pushed into Boolean-Stack: " + result);
					if(logic_tos === -1) break;
					logic_stack[logic_tos].operands += 1; // and add operand count for the latest operator
				} 
			}

			// if there's only one operand and no operators left
			if(logic_stack.length === 0 && boolean_stack.length === 1 && i === tokens.length - 1){
				// display("Without NEXT");
				return {status: FINISH, next: i + 1};
			}

			// otherwise, throw error
			else if(logic_stack.length === 0){
				// display("With NEXT");
				return {status: FINISH, next: i + 1};
			}

			else if(i === tokens.length - 1){
				display("Insufficient Operands for " + logic_stack[logic_tos].operator);
				logic_stack = [];
				logic_tos = -1;
				boolean_stack = [];
				boolean_tos = -1;
				return {status: ERROR, next: 0};
			}
			
		}

		if(logic_stack.length === 1 && boolean_stack.length === 0){
			display("Expected Literal/Variable/Operator after " + logic_stack[logic_tos].operator);
			logic_stack = [];
			logic_tos = -1;
			boolean_stack = [];
			boolean_tos = -1;
			return {status: ERROR, next: 0};
		}
	}

	// check if only literal or variable
	else if(tokens[0].type.includes("Literal") || tokens[0].type.includes("Identifier")){
		if(tokens[0].type.includes("Identifier")){
			let index = find_variable(tokens[0].lexeme);
			if(index === -1){
				display("Cannot find Identifier " + tokens[0].lexeme);
				return {status: ERROR, next: 0};
			}
			else{
				if(symbol_table[index].value === "WIN" || symbol_table[index].value === "FAIL"){
					boolean_stack.push(symbol_table[index].value) // push value of variable
					++boolean_tos;
				}
				else{
					display(symbol_table[index].value + " is not of type TROOF!");
					return {status: ERROR, next: 0};
				}
			}						
		}
		else{
			if(tokens[0].lexeme === "WIN" || tokens[0].lexeme === "FAIL"){
				boolean_stack.push(tokens[0].lexeme) // push value of variable
				++boolean_tos;
			}
			else{
				display(tokens[0].lexeme + " is not of type TROOF!");
				return {status: ERROR, next: 0};
			}
		}
		// display("Pushed into Boolean-Stack: " + boolean_stack[boolean_tos]);
		return {status: FINISH, next: 1}
	}

	// otherwise, ret pass
	else{
		display("Invalid start of " + tokens[0].lexeme)
		return {status: ERROR, next: 0};
	}
}