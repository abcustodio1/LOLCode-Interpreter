var regex = [
 {
     type: "Code Delimiter",
     pattern: /^\s*HAI\s?/
 },
 {
     type: "Code Delimiter",
     pattern: /^\s*KTHXBYE\s?/
 },
 {
     type: "Variable Declaration",
     pattern: /^I\s+HAS\s+A\s?/
 },
 {
     type: "Variable Assignment",
     pattern: /^ITZ\s?/
 },
 {
     type: "TROOF Literal",
     pattern: /^(WIN|FAIL)\s?/
 },
 {
     type: "Data Type",
     pattern: /^(NUMBR|NUMBAR|TROOF|YARN|NOOB)\s?/
 },
 {
     type: "Value Assignment",
     pattern: /^R\s?/
 },
 {
     type: "Addition Arithmetic Operator",
     pattern: /^SUM\s+OF\s?/
 },
 {
     type: "Subtraction Arithmetic Operator",
     pattern: /^DIFF\s+OF\s?/
 },
 {
     type: "Multiplication Arithmetic Operator",
     pattern: /^PRODUKT\s+OF\s?/
 },
 {
     type: "Division Arithmetic Operator",
     pattern: /^QUOSHUNT\s+OF\s?/
 },
 {
     type: "Modulo Arithmetic Operator",
     pattern: /^MOD\s+OF\s?/
 },
 {
     type: "MAX Operator",
     pattern: /^BIGGR\s+OF\s?/
 },
 {
     type: "MIN Operator",
     pattern: /^SMALLR\s+OF\s?/
 },
 {
     type: "AND Logical Operator",
     pattern: /^BOTH\s+OF\s?/
 },
 {
     type: "OR Logical Operator",
     pattern: /^EITHER\s+OF\s?/
 },
 {
     type: "XOR Logical Operator",
     pattern: /^WON\s+OF\s?/
 },
 {
     type: "Infinite Arrity AND Operator",
     pattern: /^ALL\s+OF\s?/
 },
 {
     type: "Infinite Arrity OR Operator",
     pattern: /^ANY\s+OF\s?/
 },
 {
     type: "NOT Logical Operator",
     pattern: /^NOT\s?/
 },
 {
     type: "Multiple Arrity Conjunctor",
     pattern: /^AN\s?/
 },
 {
     type: "Multiple Arrity Ender",
     pattern: /^MKAY\s?/
 },
 {
     type: "Comparing Logical Operator",
     pattern: /^BOTH\s+SAEM\s?/
 },
 {
     type: "Comparing Logical Operator (Negated)",
     pattern: /^DIFFRINT\s?/
 },
 {
     type: "String Concat Operator",
     pattern: /^SMOOSH\s?/
 },
 {
     type: "Explicit Typecasting for Expression",
     pattern: /^MAEK\s?/
 },
 {
     type: "Type Operator",
     pattern: /^A\s?/
 },
 {
     type: "Explicit Typecasting for Variable",
     pattern: /^IS\s+NOW\s+A\s?/
 },
 {
     type: "Output Keyword",
     pattern: /^VISIBLE\s?/
 },
 {
     type: "Input Keyword",
     pattern: /^GIMMEH\s?/
 },
 {
     type: "IF Statement Start Keyword",
     pattern: /^O\s+RLY\s*\?\s?/
 },
 {
     type: "IF TRUE Block Keyword",
     pattern: /^YA\s+RLY\s?/
 },
 {
     type: "ELSE Block Keyword",
     pattern: /^NO\s+WAI\s?/
 },
 {
     type: "ELSE IF Block Keyword",
     pattern: /^MEBBE\s?/
 },
 {
     type: "IF or Switch Case Statement End Keyword",
     pattern: /^OIC\s?/
 },
 {
     type: "Switch Case Start Keyword",
     pattern: /^WTF\?\s?/
 },
 {
     type: "Switch Cases Keyword",
     pattern: /^OMG\s?/
 },
 {
     type: "Break Keyword",
     pattern: /^GTFO\s?/
 },
 {
     type: "Default Cases Keyword",
     pattern: /^OMGWTF\s?/
 },
 {
     type: "Loop Start Keyword",
     pattern: /^IM\s+IN\s+YR\s?/
 },
 {
     type: "Increment Keyword",
     pattern: /^UPPIN\s+YR\s?/
 },
 {
     type: "Decrement Keyword",
     pattern: /^NERFIN\s+YR\s?/
 },
 {
     type: "Until Keyword",
     pattern: /^TIL\s?/
 },
 {
     type: "While Keyword",
     pattern: /^WILE\s?/
 },
 {
     type: "Loop End Keyword",
     pattern: /^IM\s+OUTTA\s+YR\s?/
 },
 {
     type: "Single-line Comment Keyword",
     pattern: /^BTW\s?/
 },
 {
     type: "Multi-line Comment Start Keyword",
     pattern: /^OBTW\s?/
 },
 {
     type: "Multi-line Comment End Keyword",
     pattern: /^TLDR\s?/
 },
 {
     type: "Variable Identifier",
     pattern: /^[A-Za-z][A-Za-z0-9_]*\s?/
 },
 {
     type: "NUMBAR Literal",
     pattern: /^-?[0-9]*\.[0-9]+\s?/
 },
 {
     type: "NUMBR Literal",
     pattern: /^-?[0-9]+\s?/
 },
 {
     type: "YARN Literal",
     pattern: /^"[^"]*"\s?/
 }
];
var lines;

const get_lines = () => {
  var wholeCode = document.getElementById('codeArea').value;
  // replace \t with \s
  while(wholeCode.indexOf("\t") != -1){
      wholeCode = wholeCode.substr(0, wholeCode.indexOf("\t")) + " " + wholeCode.substr(wholeCode.indexOf("\t") + 1);
  }

  // arrays for tokens
  var tokens = [];
  var perLineData = [];
  lines = wholeCode.split("\n");

  // remove extra indentations
  for(let i = 0; i < lines.length; ++i){
    if( /^\s+/.test(lines[i])) {
      lines[i] = lines[i].replace(/^\s+/.exec(lines[i]), "");
    }
  }
}

const lexical_analyzer = () => {
  var result;
  var tokens = [];

  while (lines[0] !== "") {
    var error_flag = false;

    for (let i = 0; i < regex.length; i++) {
      result = regex[i].pattern.exec(lines[0]);

      if (result !== null) {

        lines[0] = lines[0].replace(result[0], "");
        if (/^\s+/.test(lines[0])) lines[0] = lines[0].replace(/^\s+/.exec(lines[0]), "");

        if (result[0][result[0].length-1] === " ") {
          result[0] = result[0].slice(0, -1);
        } else if (lines[0] !== ""){
          if (result[0].includes("\"")) {
            error_flag = true;
            break;
          } else {
            lines[0] = result[0] + lines[0];
            continue;
          }
        }

        if (result[0] === "IT") {
          error_flag = true;
          break;
        } else if (regex[i].type.includes("Identifier") && result[0].length > 64) {
          error_flag = true;
          break;
        }

        tokens.push({lexeme: result[0], type: regex[i].type});

        if (result[0] === "BTW") {
          lines[0] = "";
          break;
        }

        break;

      } else if (result === null && i === regex.length - 1) {
        console.log("Nothing matched!" + lines[0]);
        error_flag = true;
        break;
      }
    }

    if (error_flag) break;
  }

  lines.shift();
  return tokens;
}
