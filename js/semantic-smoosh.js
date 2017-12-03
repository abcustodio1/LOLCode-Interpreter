
const semantic_smoosh = (tokens) => {
	var answer = "";
	// check if smoosh
	if(tokens[0].type === "String Concat Operator"){
		tokens.shift();
		if(tokens.length !== 0){
			if(tokens[0].type.includes("Literal") || tokens[0].type === "Variable Identifier"){
				if(tokens[0].type === "Variable Identifier"){
					var index = find_variable(tokens[0].lexeme);
				    if (index === -1) {
				      error_prompt("ERROR! Variable Uninitialized!");
				      return ERROR;
				    }
				    else{
				    	answer += remove_quotes(symbol_table[index].value);
				    }
				}
				else{
					answer += remove_quotes(tokens[0].lexeme);
				}
				tokens.shift();
				while(tokens.length !== 0){
					if(tokens[0].type === "Multiple Arrity Conjunctor"){
						tokens.shift();
						if(tokens.length !== 0 && (tokens[0].type.includes("Literal") || tokens[0].type === "Variable Identifier")){
							if(tokens[0].type === "Variable Identifier"){
								var index = find_variable(tokens[0].lexeme);
							    if (index === -1) {
							      error_prompt("ERROR! Variable Uninitialized!");
							      return ERROR;
							    }
							    else{
							    	answer += remove_quotes(symbol_table[index].value);
							    }
							}
							else{
								answer += remove_quotes(tokens[0].lexeme);
							}
							tokens.shift();
						}
						else{
							error_prompt("Expected Literal or Variable");
							return ERROR;
						}
					}
					else{
						error_prompt("Expected AN");
						return ERROR;
					}
				}
			}
			else{
				error_prompt("Not Literal or Variable");
				return ERROR;
			}
		}
		else{
			error_prompt("Expected Literal or Variable");
			return ERROR;
		}
	}
	else{
		return PASS;
	}
	symbol_table[0].type = "YARN";
	symbol_table[0].value = "\""+ answer + "\"";
	render_symbol_table();
	return FINISH;
}


const remove_quotes = (string) => {
	while(string.includes("\"")){
		string = string.replace("\"", "");
	}
	return string;
}