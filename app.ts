
import e = require('./lib/equation');
import str = require('./lib/str');

let input = <HTMLInputElement>(document.getElementById('equation'));
let output = <HTMLElement>(document.getElementById('output'));

input.addEventListener('keyup', () => {
  let inputStr = input.value;
  let parsed: e.Equation;
  let html: string;
  try {
    parsed = str.strToEq(inputStr);
    html = str.eqToHtml(parsed);
  } catch (e) {
    output.innerHTML = e.message;
    return;
  }
  output.innerHTML = html;
});
