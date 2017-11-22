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

  // for O RLY block
  if(lines.length === 0 && ifelse_stack.length !== 0){
    display("O RLY block is INCOMPLETE");
  }
  ifelse_tos = -1;
  ifelse_stack = [];
  waiting = false;
  waiting_block = null;
}
