

const smoosh = (tokens) => {
	// check if smoosh
	if(tokens[0].type === "String Concat Operator"){
		tokens.shift();
		if(tokens.length !== 0){
			if(tokens[0].type.includes("Literal") || tokens[0].type === "Variable Identifier"){
				tokens.shift();
				while(tokens.length !== 0){
					if(tokens[0].type === "Multiple Arrity Conjunctor"){
						tokens.shift();
						if(tokens.length !== 0 && (tokens[0].type.includes("Literal") || tokens[0].type === "Variable Identifier")){
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
	return FINISH;
}