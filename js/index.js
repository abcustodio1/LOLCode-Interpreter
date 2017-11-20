'use strict';

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
                    type: "TYPE Literal",
                    pattern: /^(NUMBR|NUMBAR|TROOF|YARN|NOOB)\s?/
                },
                {
                    type: "Value Assignment",
                    pattern: /^R\s?/
                },
                {
                    type: "Addition Operator",
                    pattern: /^SUM\s+OF\s?/
                },
                {
                    type: "Subtraction Operator",
                    pattern: /^DIFFRINT\s+OF\s?/
                },
                {
                    type: "Multiplication Operator",
                    pattern: /^PRODUKT\s+OF\s?/
                },
                {
                    type: "Division Operator",
                    pattern: /^QUOSHUNT\s+OF\s?/
                },
                {
                    type: "Modulo Operator",
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
                    type: "AND Operator",
                    pattern: /^BOTH\s+OF\s?/
                },
                {
                    type: "OR Operator",
                    pattern: /^EITHER\s+OF\s?/
                },
                {
                    type: "XOR Operator",
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
                    type: "NOT Operator",
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
                    type: "Comparing Operator",
                    pattern: /^BOTH\s+SAEM\s?/
                },
                {
                    type: "Comparing Operator (Negated)",
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
var symbol_table = [];

const runCode = () => {
  get_lines();
  console.log(lines);
  while (lines.length !== 0) {
    if(lines[0] === ""){
      lines.shift();
      continue;
    }

    console.log(lexical_analyzer());
  }
}
