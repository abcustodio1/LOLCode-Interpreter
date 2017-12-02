var answer = "";
var str;

const semantic_smoosh = (tokens) => {
	// check if smoosh
	if(tokens[0].type === "String Concat Operator"){
		tokens.shift();
		if(tokens.length !== 0){
			if(tokens[0].type.includes("Literal") || tokens[0].type === "Variable Identifier"){
				str = tokens.shift()
				answer=answer.concat(str.lexeme);
				while(tokens.length !== 0){
					if(tokens[0].type === "Multiple Arrity Conjunctor"){
						tokens.shift();
						if(tokens.length !== 0 && (tokens[0].type.includes("Literal") || tokens[0].type === "Variable Identifier")){
							str = tokens.shift()
							answer=answer.concat(str.lexeme);
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
		return PASS;
	}
	display("Correct Smoosh block");
	symbol_table[0].type = categorize(answer.toString());
	symbol_table[0].value = answer;
	render_symbol_table();
	display(answer);
	answer="";
	str={};
	return FINISH;
}