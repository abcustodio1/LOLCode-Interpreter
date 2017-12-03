const hai_kthxbye = (tokens) => {
	if(tokens[0].type === "Code Delimiter"){
		if(tokens.length === 1){
			return FINISH;
		}
		else{
			error_prompt("Expected Linebreak after " + tokens[0].lexeme);
			return ERROR;
		}
	}
	else{
		return PASS;
	}
}