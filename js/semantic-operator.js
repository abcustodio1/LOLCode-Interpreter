
var operation = [];
var literal_stack = [];
var operation_tos = -1;
var literal_tos = -1;


const semantic_operator = (tokens) => {
	var operators = ["Addition Arithmetic Operator", "Subtraction Arithmetic Operator", "Multiplication Arithmetic Operator", "Division Arithmetic Operator", "Modulo Arithmetic Operator", "MAX Operator", "MIN Operator", "AND Logical Operator", "OR Logical Operator", "XOR Logical Operator", "Comparing Logical Operator", "Comparing Logical Operator (Negated)", "NOT Logical Operator"];
	var an_flag = false;
	// if the first operator is there
	if(operators.includes(tokens[0].type)){
		operation.push({operator: tokens[0].type, operands: 0, max: (tokens[0].type === "NOT Logical Operator" ? 1 : 2)}); // push operator
		++operation_tos;
		display("Pushed into OP-Stack: " + tokens[0].lexeme);
		for(let i = 1; i < tokens.length; ++i){
			// check if an_flag is true
			if(an_flag){
				// if operator
				if(operators.includes(tokens[i].type)){
					operation.push({operator: tokens[i].type, operands: 0, max: (tokens[i].type === "NOT Logical Operator" ? 1 : 2)}); // push operator
					++operation_tos;
					display("Pushed into OP-Stack: " + tokens[i].lexeme);
					an_flag = false;
				}
				// check if its literal or variable
				else if(tokens[i].type.includes("Literal") || tokens[i].type.includes("Identifier")){
					if(tokens[i].type.includes("Identifier")){
						let index = find_variable(tokens[i].lexeme);
						if(index === -1){
							display("Cannot find Identifier " + tokens[i].lexeme);
							return ERROR;
						}
						else{
							literal_stack.push(symbol_table[index].value) // push value of variable
							++literal_tos;	
						}						
					}
					else{
						literal_stack.push(tokens[i].lexeme) // push literal
						++literal_tos;
						
					}
					display("Pushed into Literal-Stack: " + literal_stack[literal_tos]);
					if(operation_tos !== -1) ++operation[operation_tos].operands;
					an_flag = false;
				}

				// otherwise, throw error
				else{
					display("Expected Literal/Variable or Operator after AN");
					operation = [];
					operation_tos = -1;
					literal_stack = [];
					literal_tos = -1;
					return ERROR;
				}
			}
			// if AN and there's one operand
			else if(tokens[i].type === "Multiple Arrity Conjunctor"){
				if(operation_tos === -1 || operation[operation_tos].operands === 1){
					display("See AN");
					an_flag = true;
					// continue;
				}
				// return error
				else{
					display("Expected value before AN");
					operation = [];
					operation_tos = -1;
					literal_stack = [];
					literal_tos = -1;
					return ERROR;
				}
			}
			// if operator
			else if(operators.includes(tokens[i].type)){
				// throw error
				if(operation_tos !== -1 && operation[operation_tos].operands === 1){
					display("Expected AN before " + tokens[i].lexeme);
					operation = [];
					operation_tos = -1;
					literal_stack = [];
					literal_tos = -1;
					return ERROR;
				}
				else{
					operation.push({operator: tokens[i].type, operands: 0, max: (tokens[i].type === "NOT Logical Operator" ? 1 : 2)}); // push operator
					++operation_tos;
					display("Pushed into OP-Stack: " + tokens[i].lexeme);
				}
			}
			// if literal or variable
			else if(tokens[i].type.includes("Literal") || tokens[i].type.includes("Identifier")){
				if(operation_tos !== -1 && operation[operation_tos].operands === 1){
					display("Expected AN before " + tokens[i].lexeme);
					operation = [];
					operation_tos = -1;
					literal_stack = [];
					literal_tos = -1;
					return ERROR;
				}
				else{
					if(tokens[i].type.includes("Identifier")){
						let index = find_variable(tokens[i].lexeme);
						if(index === -1){
							display("Cannot find Identifier " + tokens[i].lexeme);
							return ERROR;
						}
						else{
							literal_stack.push(symbol_table[index].value) // push value of variable
							++literal_tos;	
						}						
					}
					else{
						literal_stack.push(tokens[i].lexeme) // push literal
						++literal_tos;
						
					}
					display("Pushed into Literal-Stack: " + literal_stack[literal_tos]);
					if(operation_tos !== -1) ++operation[operation_tos].operands;
				}
			}
			// else not a valid syntax, throw error
			else{
				display("Invalid start of " + tokens[i].lexeme);
				operation = [];
				operation_tos = -1;
				literal_stack = [];
				literal_tos = -1;
				return ERROR;
			}

			// check if the operator at tos of operation has already 2 operands
			if(operation_tos !== -1){
				while(operation[operation_tos].operands === operation[operation_tos].max){
					//pop last 2 operands
					var first_operand = null;
					var second_operand = literal_stack.pop(); // (2nd operand)
					--literal_tos;
					display("Popped from Literal-Stack: " + second_operand);
					if(operation[operation_tos].max !== 1){
						first_operand = literal_stack.pop(); // (1st operand)
						--literal_tos;
						display("Popped from Literal-Stack: " + first_operand);
					}
					operation_used = operation.pop(); // pop the operator in tos
					--operation_tos;
					display("Popped from OP-Stack: " + operation_used.operator);

					var result = execute_operation(operation_used.operator, first_operand, second_operand);
					if(result === ERROR){
						operation = [];
						operation_tos = -1;
						literal_stack = [];
						literal_tos = -1;
						return ERROR;
					}
					literal_stack.push(result); // push result of the operations (DUMMY in this case)
					++literal_tos;
					display("Pushed into OP-Stack: " + result);
					if(operation_tos === -1) break;
					operation[operation_tos].operands += 1; // and add operand count for the latest operator
				} 
			}

			// if there's only one operand and no operators left
			if(operation.length === 0 && literal_stack.length === 1 && i === tokens.length - 1){
				display("Correct Arithmetic Semantic");
				display(literal_stack.pop());
				operation = [];
				operation_tos = -1;
				literal_stack = [];
				literal_tos = -1;
				return FINISH;
			}

			// otherwise, throw error
			else if(operation.length === 0){
				display("Unexpected Statement after: " + tokens[i].lexeme);
				operation = [];
				operation_tos = -1;
				literal_stack = [];
				literal_tos = -1;
				return ERROR;
			}

			else if(i === tokens.length - 1){
				display("Insufficient Operands for " + operation[operation_tos].operator);
				operation = [];
				operation_tos = -1;
				literal_stack = [];
				literal_tos = -1;
				return ERROR;
			}
			
		}

		if(operation.length === 1 && literal_stack.length === 0){
			display("Expected Literal/Variable/Operator after " + operation[operation_tos].operator);
			operation = [];
			operation_tos = -1;
			literal_stack = [];
			literal_tos = -1;
			return ERROR;
		}
	}

	// otherwise, ret pass
	else{
		return PASS;
	}
}


const execute_operation = (operator, first_operand, second_operand) => {
	// var operators = ["Addition Arithmetic Operator", "Subtraction Arithmetic Operator", "Multiplication Arithmetic Operator", "Division Arithmetic Operator", 
	// "Modulo Arithmetic Operator", "MAX Operator", "MIN Operator", "AND Logical Operator", 
	// "OR Logical Operator", "XOR Logical Operator", "Comparing Logical Operator", "Comparing Logical Operator (Negated)",
	//  "NOT Logical Operator"];

	// remove " on YARNS

	if(typeof(first_operand) === "number"){
		first_operand = first_operand.toString();
	}
	if(typeof(second_operand) === "number"){
		second_operand = second_operand.toString();
	}

	if(first_operand !== null){
		if(first_operand !== "\"WIN\"" && first_operand !== "\"FAIL\""){
			while(first_operand.indexOf("\"") !== -1){
				first_operand = first_operand.replace("\"", "");
			}
		}
	}
	if(second_operand !== "\"WIN\"" && second_operand !== "\"FAIL\""){
		while(second_operand.indexOf("\"") !== -1){
			second_operand = second_operand.replace("\"", "");
		}		
	}

	var op1 = null;
	var op2 = null;
	var result = null;


	switch(operator){
		case "Addition Arithmetic Operator":
			op1 = parseFloat(first_operand);
			op2 = parseFloat(second_operand);
			if(!isNaN(op1) && !isNaN(op2)){
				result = op1 + op2;
				return result.toString();
			}
			else{
				display(operator + " Detected Invalid operands");
				return ERROR;
			}
		case "Subtraction Arithmetic Operator":
			op1 = parseFloat(first_operand);
			op2 = parseFloat(second_operand);
			if(!isNaN(op1) && !isNaN(op2)){
				result = op1 - op2;
				return result.toString();
			}
			else{
				display(operator + " Detected Invalid operands");
				return ERROR;
			}
		case "Multiplication Arithmetic Operator":
			op1 = parseFloat(first_operand);
			op2 = parseFloat(second_operand);
			if(!isNaN(op1) && !isNaN(op2)){
				result = op1 * op2;
				return result.toString();
			}
			else{
				display(operator + " Detected Invalid operands");
				return ERROR;
			}
		case "Division Arithmetic Operator":
			op1 = parseFloat(first_operand);
			op2 = parseFloat(second_operand);
			if(!isNaN(op1) && !isNaN(op2)){
				if(op2 !== 0){
					result = op1 / op2;
					return result.toString();
				}
				else{
					display("Division by zero is undefined");
					return ERROR;
				}
			}
			else{
				display(operator + " Detected Invalid operands");
				return ERROR;
			}
		case "Modulo Arithmetic Operator":
			op1 = parseFloat(first_operand);
			op2 = parseFloat(second_operand);
			if(!isNaN(op1) && !isNaN(op2)){
				if(op2 !== 0){
					result = op1 % op2;
					return result.toString();
				}
				else{
					display("Division by zero is undefined");
					return ERROR;
				}
			}
			else{
				display(operator + " Detected Invalid operands");
				return ERROR;
			}
		case "MAX Operator":
			op1 = parseFloat(first_operand);
			op2 = parseFloat(second_operand);
			if(!isNaN(op1) && !isNaN(op2)){
				result = op1 > op2 ? op1 : op2;
				return result.toString();
			}
			else{
				display(operator + " Detected Invalid operands");
				return ERROR;
			}
		case "MIN Operator":
			op1 = parseFloat(first_operand);
			op2 = parseFloat(second_operand);
			if(!isNaN(op1) && !isNaN(op2)){
				result = op1 < op2 ? op1 : op2;
				return result.toString();
			}
			else{
				display(operator + " Detected Invalid operands");
				return ERROR;
			}
		case "AND Logical Operator":
			if((first_operand === "WIN" || first_operand === "FAIL") && (second_operand === "WIN" || second_operand === "FAIL")){
				op1 = (first_operand === "WIN" ? true : false);
				op2 = (second_operand === "WIN" ? true : false);
				result = (op1 && op2 ? "WIN" : "FAIL");
				return result;
			}
			else{
				display(operator + " Detected Invalid operands");
				return ERROR;
			}
		case "OR Logical Operator":
			if((first_operand === "WIN" || first_operand === "FAIL") && (second_operand === "WIN" || second_operand === "FAIL")){
				op1 = (first_operand === "WIN" ? true : false);
				op2 = (second_operand === "WIN" ? true : false);
				result = (op1 || op2 ? "WIN" : "FAIL");
				return result;
			}
			else{
				display(operator + " Detected Invalid operands");
				return ERROR;
			}
		case "XOR Logical Operator":
			if((first_operand === "WIN" || first_operand === "FAIL") && (second_operand === "WIN" || second_operand === "FAIL")){
				op1 = (first_operand === "WIN" ? true : false);
				op2 = (second_operand === "WIN" ? true : false);
				result = ((( op1 || op2 ) && !( op1 && op2 )) ? "WIN" : "FAIL");
				return result;
			}
			else{
				display(operator + " Detected Invalid operands");
				return ERROR;
			}
		case "Comparing Logical Operator":
			op1 = parseFloat(first_operand);
			op2 = parseFloat(second_operand);
			if(!isNaN(op1) && !isNaN(op2)){
				result = op1 === op2 ? "WIN" : "FAIL";
				return result;
			}
			else{
				result = first_operand === second_operand ? "WIN" : "FAIL";
				return result;
			}
		case "Comparing Logical Operator (Negated)":
			op1 = parseFloat(first_operand);
			op2 = parseFloat(second_operand);
			if(!isNaN(op1) && !isNaN(op2)){
				result = op1 !== op2 ? "WIN" : "FAIL";
				return result;
			}
			else{
				result = first_operand !== second_operand ? "WIN" : "FAIL";
				return result;
			}
		default:
			if(second_operand === "WIN" || second_operand === "FAIL"){
				op2 = (second_operand === "WIN" ? true : false);
				result = (!op2 ? "WIN" : "FAIL");
				return result;
			}
			else{
				display(operator + " Detected Invalid operand");
				return ERROR;
			}
	}
}