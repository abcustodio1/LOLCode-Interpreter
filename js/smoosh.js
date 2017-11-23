

const smoosh = (tokens) => {
	// check if smoosh
	if(tokens[0].type === "String Concat Operator"){
		tokens.shift();
		if(tokens.length !== 0){
			if(tokens[0].type === "YARN Literal" || tokens[0].type === "Variable Identifier"){
				tokens.shift();
				while(tokens.length !== 0){
					if(tokens[0].type === "Multiple Arrity Conjunctor"){
						tokens.shift();
						if(tokens.length !== 0 && (tokens[0].type === "YARN Literal" || tokens[0].type === "Variable Identifier")){
							tokens.shift();
						}
						else{
							display("Expected Literal or Variable");
							return ERROR;
						}
					}
					else{
						display("Expected AN");
						return ERROR;
					}
				}
			}
			else{
				display("Not Literal or Variable");
				return ERROR;
			}
		}
		else{
			display("Expected Literal or Variable");
			return ERROR;
		}
	}
	else{
		display("SMOOSH is not the proper syntax checker");
		return PASS;
	}
	display("Correct Smoosh block");
	return FINISH;
}