var operations = [];
var values = [];
var count = 0;
var index = 0;

const SPECIAL = "SPECIAL";
var anFlag = false;
var opFlag = false;

var x = 0;
var y = 0;

const arithmetic_operator = (tokens) => {
	var functions = [addition_operator, subtraction_operator, multiplication_operator, division_operator, modulo_operator];
	var result;
	index = tokens.length;

	for (let i = 0; i < functions.length;) {
		console.log("# OF tokens: " + tokens.length);
    	result = functions[i](tokens);

    	if (result === ERROR) return false;
    	else if ((result === FINISH || result === SPECIAL) && count !== index) {
    		i = 0;
    		continue;
    	} else if (result === FINISH && count === index){		//end of loop, printing of values
    		console.log(operations);
    		console.log(values);
    		return true;
    	}

    	if (result === PASS && i === functions.length - 1) {
    		console.log("NO function read!");
    		return false;
    	}

    	i++;
  	}
}

const addition_operator = (subToken) => {
	if (subToken[0].type === "Addition Arithmetic Operator") {
		opFlag = true;
		operations.unshift("+");
		count ++;
		subToken.shift();

		if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") { //part of semantic
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();

			if (subToken[0].type === "Multiple Arrity Conjunctor") {
				count ++;
				subToken.shift();

				if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else if (subToken[0].type === "Variable Identifier") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else return SPECIAL;

			} else {
				//insert return for error here
				console.log("Expected 'AN'.");
				return ERROR;
			}
		} else if (subToken[0].type === "Variable Identifier") { //part of semantic
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();

			if (subToken[0].type === "Multiple Arrity Conjunctor") {
				count ++;
				subToken.shift();

				if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else if (subToken[0].type === "Variable Identifier") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				}
				
			} else {
				//insert return for error here
				console.log("Expected 'AN'.");
				return ERROR;
			}
		} else if (subToken[0].type.includes("Arithmetic Operator")) {
			anFlag = true;
			// subToken.shift();
			return SPECIAL;
		} else {
			anFlag = true;
			count ++;
			subToken.shift();
			return SPECIAL;
		}
	} else if (subToken[0].type === "Multiple Arrity Conjunctor" && anFlag) {
		count ++;
		subToken.shift();

		if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();
			return FINISH;
		} else if (subToken[0].type === "Variable Identifier") {
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();
			return FINISH;
		} else return SPECIAL;
	} else if (subToken[0].type.includes("Arithmetic Operator") && opFlag) {
		opFlag = false;
		return SPECIAL;
	} else return PASS;

}

const subtraction_operator = (subToken) => {
	if (subToken[0].type === "Subtraction Arithmetic Operator") {
		opFlag = true;
		operations.unshift("-");
		count ++;
		subToken.shift();

		if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") { //part of semantic
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();

			if (subToken[0].type === "Multiple Arrity Conjunctor") {
				count ++;
				subToken.shift();

				if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else if (subToken[0].type === "Variable Identifier") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else return SPECIAL;

			} else {
				//insert return for error here
				console.log("Expected 'AN'.");
				return ERROR;
			}
		} else if (subToken[0].type === "Variable Identifier") { //part of semantic
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();

			if (subToken[0].type === "Multiple Arrity Conjunctor") {
				count ++;
				subToken.shift();

				if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else if (subToken[0].type === "Variable Identifier") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				}
				
			} else {
				//insert return for error here
				console.log("Expected 'AN'.");
				return ERROR;
			}
		} else if (subToken[0].type.includes("Arithmetic Operator")) {
			anFlag = true;
			// subToken.shift();
			return SPECIAL;
		} else {
			anFlag = true;
			count ++;
			subToken.shift();
			return SPECIAL;
		}
	} else if (subToken[0].type === "Multiple Arrity Conjunctor" && anFlag) {
		count ++;
		subToken.shift();

		if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();
			return FINISH;
		} else if (subToken[0].type === "Variable Identifier") {
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();
			return FINISH;
		} else return SPECIAL;
	} else if (subToken[0].type.includes("Arithmetic Operator") && opFlag) {
		opFlag = false;
		return SPECIAL;
	} else return PASS;

}

const multiplication_operator = (subToken) => {
	if (subToken[0].type === "Multiplication Arithmetic Operator") {
		opFlag = true;
		operations.unshift("*");
		count ++;
		subToken.shift();

		if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") { //part of semantic
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();

			if (subToken[0].type === "Multiple Arrity Conjunctor") {
				count ++;
				subToken.shift();

				if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else if (subToken[0].type === "Variable Identifier") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else return SPECIAL;

			} else {
				//insert return for error here
				console.log("Expected 'AN'.");
				return ERROR;
			}
		} else if (subToken[0].type === "Variable Identifier") { //part of semantic
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();

			if (subToken[0].type === "Multiple Arrity Conjunctor") {
				count ++;
				subToken.shift();

				if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else if (subToken[0].type === "Variable Identifier") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				}
				
			} else {
				//insert return for error here
				console.log("Expected 'AN'.");
				return ERROR;
			}
		} else if (subToken[0].type.includes("Arithmetic Operator")) {
			anFlag = true;
			// subToken.shift();
			return SPECIAL;
		} else {
			anFlag = true;
			count ++;
			subToken.shift();
			return SPECIAL;
		}
	} else if (subToken[0].type === "Multiple Arrity Conjunctor" && anFlag) {
		count ++;
		subToken.shift();

		if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();
			return FINISH;
		} else if (subToken[0].type === "Variable Identifier") {
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();
			return FINISH;
		} else return SPECIAL;
	} else if (subToken[0].type.includes("Arithmetic Operator") && opFlag) {
		opFlag = false;
		return SPECIAL;
	} else return PASS;

}

const division_operator = (subToken) => {
	if (subToken[0].type === "Division Arithmetic Operator") {
		opFlag = true;
		operations.unshift("/");
		count ++;
		subToken.shift();

		if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") { //part of semantic
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();

			if (subToken[0].type === "Multiple Arrity Conjunctor") {
				count ++;
				subToken.shift();

				if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else if (subToken[0].type === "Variable Identifier") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else return SPECIAL;

			} else {
				//insert return for error here
				console.log("Expected 'AN'.");
				return ERROR;
			}
		} else if (subToken[0].type === "Variable Identifier") { //part of semantic
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();

			if (subToken[0].type === "Multiple Arrity Conjunctor") {
				count ++;
				subToken.shift();

				if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else if (subToken[0].type === "Variable Identifier") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				}
				
			} else {
				//insert return for error here
				console.log("Expected 'AN'.");
				return ERROR;
			}
		} else if (subToken[0].type.includes("Arithmetic Operator")) {
			anFlag = true;
			// subToken.shift();
			return SPECIAL;
		} else {
			anFlag = true;
			count ++;
			subToken.shift();
			return SPECIAL;
		}
	} else if (subToken[0].type === "Multiple Arrity Conjunctor" && anFlag) {
		count ++;
		subToken.shift();

		if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();
			return FINISH;
		} else if (subToken[0].type === "Variable Identifier") {
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();
			return FINISH;
		} else return SPECIAL;
	} else if (subToken[0].type.includes("Arithmetic Operator") && opFlag) {
		opFlag = false;
		return SPECIAL;
	} else return PASS;

}

const modulo_operator = (subToken) => {
	if (subToken[0].type === "Modulo Arithmetic Operator") {
		opFlag = true;
		operations.unshift("%");
		count ++;
		subToken.shift();

		if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") { //part of semantic
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();

			if (subToken[0].type === "Multiple Arrity Conjunctor") {
				count ++;
				subToken.shift();

				if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else if (subToken[0].type === "Variable Identifier") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else return SPECIAL;

			} else {
				//insert return for error here
				console.log("Expected 'AN'.");
				return ERROR;
			}
		} else if (subToken[0].type === "Variable Identifier") { //part of semantic
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();

			if (subToken[0].type === "Multiple Arrity Conjunctor") {
				count ++;
				subToken.shift();

				if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				} else if (subToken[0].type === "Variable Identifier") {
					values.unshift(subToken[0]);
					count ++;
					subToken.shift();
					return FINISH;
				}
				
			} else {
				//insert return for error here
				console.log("Expected 'AN'.");
				return ERROR;
			}
		} else if (subToken[0].type.includes("Arithmetic Operator")) {
			anFlag = true;
			// subToken.shift();
			return SPECIAL;
		} else {
			anFlag = true;
			count ++;
			subToken.shift();
			return SPECIAL;
		}
	} else if (subToken[0].type === "Multiple Arrity Conjunctor" && anFlag) {
		count ++;
		subToken.shift();

		if (subToken[0].type === "NUMBAR Literal" || subToken[0].type === "NUMBR Literal") {
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();
			return FINISH;
		} else if (subToken[0].type === "Variable Identifier") {
			values.unshift(subToken[0]);
			count ++;
			subToken.shift();
			return FINISH;
		} else return SPECIAL;
	} else if (subToken[0].type.includes("Arithmetic Operator") && opFlag) {
		opFlag = false;
		return SPECIAL;
	} else return PASS;

}