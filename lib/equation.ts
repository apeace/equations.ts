
export enum Operator {
  Plus, Minus
}

export interface EquationVariable {
  coefficient: number;
  variable: string;
  power: number;
}

// helper to create an EquationVariable
export function variable (
  coefficient: number,
  variable: string,
  power: number): EquationVariable {
  return {
    coefficient: coefficient,
    variable: variable,
    power: power
  };
}

export type EquationConstant = number;

export type EquationTerm = EquationVariable|EquationConstant;

export interface Equation {
  left: EquationTerm;
  operator?: Operator;
  right?: Equation;
}

// helper to create an Equation
export function equation (
  left: EquationTerm,
  operator?: Operator,
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
  let terms: EquationTerm[] = [];
  let ops: Operator[] = [];
  let match = str.match(termRegexp);
  while (match) {
    terms.push(strToTerm(match[1]));
    if (match[2]) {
      ops.push(match[2] === '+' ? Operator.Plus : Operator.Minus);
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
export function strToTerm (str: string): EquationTerm {
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
