
import equation = require('./lib/equation');

let input = <HTMLInputElement>(document.getElementById('equation'));
let output = <HTMLElement>(document.getElementById('output'));

input.addEventListener('keyup', () => {
  let str = input.value;
  let parsed: equation.Equation;
  let html: string;
  try {
    parsed = equation.strToEq(str);
    html = equation.eqToHtml(parsed);
  } catch (e) {
    output.innerHTML = e.message;
    return;
  }
  output.innerHTML = html;
});
