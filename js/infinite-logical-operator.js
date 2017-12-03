
const infinite_logical = (tokens) => {
	var operators = ["Infinite Arrity OR Operator", "Infinite Arrity AND Operator"];
	var starting_operator = null;
	var prev = 1;
	var mkay_flag = false;
	// if the first operator is there
	if(operators.includes(tokens[0].type)){
		starting_operator = tokens[0].type;
		// display("Operator: " + tokens[0].lexeme);
		var an = false;
		var i = 1;
		while(i < tokens.length){
			if(!mkay_flag){
				prev = i;
				let result = syntax_logical(tokens.slice(i, tokens.length));
				if(result.status !== ERROR){
					i = prev + result.next;
					an = false;
					if(i !== tokens.length){
						if(tokens[i].type === "Multiple Arrity Conjunctor"){
							// display("Detected AN");
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
			// display("Correct Infinite Logical Syntax");
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
		// display("Infinite Logical is not appropriate!")
		return PASS;
	}
}