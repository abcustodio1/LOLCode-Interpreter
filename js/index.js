'use strict';

var symbol_table = [];

const runCode = () => {
  get_lines();
  console.log(lines);
  while (lines.length !== 0) {
    if(lines[0] === ""){
      lines.shift();
      continue;
    }

    var tokens = lexical_analyzer();
    if(!syntax_analyzer(tokens)) break;
    else{
      // semantic analyzer
    }
    console.log(symbol_table);
  }
}
