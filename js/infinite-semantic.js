
const infinite_logical_semantic = (tokens) => {
	var operators = ["Infinite Arrity OR Operator", "Infinite Arrity AND Operator"];
	var starting_operator = null;
	var prev = 1;
	var mkay_flag = false;
	// if the first operator is there
	if(operators.includes(tokens[0].type)){
		starting_operator = tokens[0].type;
		// error_prompt("Operator: " + tokens[0].lexeme);
		var an = false;
		var i = 1;
		while(i < tokens.length){
			if(!mkay_flag){
				prev = i;
				let result = semantic_logical(tokens.slice(i, tokens.length));
				if(result.status !== ERROR){

					if(starting_operator === "Infinite Arrity OR Operator"){
						let answer = boolean_stack.pop();
						logic_stack = [];
						logic_tos = -1;
						boolean_stack = [];
						boolean_tos = -1;
						if(answer === "WIN"){
							symbol_table[0].type = "TROOF";
							symbol_table[0].value = "WIN";
							render_symbol_table();
							return FINISH;
						}
					}
					else{
						let answer = boolean_stack.pop();
						logic_stack = [];
						logic_tos = -1;
						boolean_stack = [];
						boolean_tos = -1;
						if(answer === "FAIL"){
							symbol_table[0].type = "TROOF";
							symbol_table[0].value = "FAIL";
							render_symbol_table();
							return FINISH;
						}
					}

					i = prev + result.next;
					an = false;
					if(i !== tokens.length){
						if(tokens[i].type === "Multiple Arrity Conjunctor"){
							// error_prompt("Detected AN");
							an = true;
							++i;// increment i
						}
						else if(tokens[i].type === "Multiple Arrity Ender"){
							mkay_flag = true;
							++i;// increment i
						}
						else{
							error_prompt("Expected AN before " + tokens[i].lexeme);
							return ERROR;
						}
					}
					else{
						error_prompt("Expected MKAY");
						return ERROR;
					}
				}
				else{
					return ERROR;
				}
			}
			// throws error
			else{
				error_prompt("Expected Line Break after MKAY");
				return ERROR;
			}
		}
		if(mkay_flag){
			// error_prompt("Correct Infinite Logical Semantic");
			if(starting_operator === "Infinite Arrity OR Operator"){
				symbol_table[0].type = "TROOF";
				symbol_table[0].value = "FAIL";
			}
			else{
				symbol_table[0].type = "TROOF";
				symbol_table[0].value = "WIN";	
			}
			render_symbol_table();
			return FINISH;
		}
		else if(!an){
			error_prompt("Expected Logical Expression/Literal/Variable After " + starting_operator);
			return ERROR;
		}
		else{
			error_prompt("Expected Logical Expression/Literal/Variable After AN");
			return ERROR;
		}
	}
	// otherwise, ret pass
	else{
		// error_prompt("Infinite Logical Semantic is not appropriate!")
		return PASS;
	}
}