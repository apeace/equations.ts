
export enum Op {
  Plus, Minus
}

export interface Variable {
  coefficient: number;
  variable: string;
  power: number;
}

// helper to create a Variable
export function v (
  coefficient: number,
  variable: string,
  power: number): Variable {
  return {
    coefficient: coefficient,
    variable: variable,
    power: power
  };
}

export type Constant = number;

export type Term = Variable|Constant;

export interface Equation {
  left: Term;
  operator?: Op;
  right?: Equation;
}

// helper to create an Equation
export function eq (
  left: Term,
  operator?: Op,
  right?: Equation): Equation {
  if (operator !== null && operator !== undefined) {
    return {
      left: left,
      operator: operator,
      right: right
    };
  }
  return {left: left, operator: null, right: null};
}

// turn a string like '4x^2 + 3x + 2' into an equation
let termRegexp = /^([^+-\s]+)\s*([+-])?\s*/;
export function strToEq (str: string): Equation {
  let terms: Term[] = [];
  let ops: Op[] = [];
  let match = str.match(termRegexp);
  while (match) {
    terms.push(strToTerm(match[1]));
    if (match[2]) {
      ops.push(match[2] === '+' ? Op.Plus : Op.Minus);
    }
    str = str.substring(match[0].length);
    match = str.match(termRegexp);
  }
  if (str.length !== 0) {
    throw new Error('Unable to parse the rest of the equation: ' + str);
  }

  let eq: Equation = {left: terms[0], operator: null, right: null};
  let leftSide = eq;
  for (let i = 1; i < terms.length; i++) {
    leftSide.operator = ops.shift();
    let newLeftSide: Equation = {
      left: terms[i],
      operator: null,
      right: null
    };
    leftSide.right = newLeftSide;
    leftSide = newLeftSide;
  }
  if (ops.length > 0) {
    throw new Error('Too many operators');
  }

  return eq;
}

const constRegexp = /^\d+$/;
const varRegexp = /^(\d*)(x)(\^\d+)?$/;
export function strToTerm (str: string): Term {
  let match = str.match(constRegexp);
  if (match) {
    return Number(str);
  }
  match = str.match(varRegexp);
  if (!match) {
    throw new Error('Unrecognized term: ' + str);
  }
  let coefficient = match[1];
  let variable = match[2];
  let power = match[3] ? match[3].substring(1) : 1;
  return {
    coefficient: Number(coefficient),
    variable: variable,
    power: Number(power)
  };
}

export function eqToHtml (eq: Equation): string {
  if (typeof eq.left === 'number') {
    return String(eq.left);
  }
  let out = variableToHtml(<Variable>eq.left);
  if (eq.right) {
    let op = eq.operator === Op.Plus ? '+' : '-';
    out += ' ' + op + ' ' + eqToHtml(eq.right);
  }
  return out;
}

export function variableToHtml (v: Variable): string {
  let coefficient = v.coefficient === 1 ? '' : String(v.coefficient);
  let variable = v.variable;
  let power = v.power === 1 ? '' : (v.power ? '<sup>' + v.power + '</sup>' : '');
  return coefficient + variable + power;
}
