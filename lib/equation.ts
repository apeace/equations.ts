
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
export function strToEq (str: string): Equation {
  let terms: EquationTerm[] = [];
  let ops: Operator[] = [];
  let term = '';
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === ' ') {
      continue;
    }
    else if (char === '+' || char === '-') {
      terms.push(strToTerm(term));
      ops.push(char === '+' ? Operator.Plus : Operator.Minus);
      term = '';
    }
    else {
      term += char;
    }
  }
  if (term !== '') {
    terms.push(strToTerm(term));
  }
  let eq: Equation = {left: terms[0]};
  let leftSide = eq;
  for (let i = 1; i < terms.length; i++) {
    if (ops.length === 0) {
      throw new Error('Not enough operators');
    }
    leftSide.operator = ops.shift();
    let newLeftSide: Equation = {
      left: terms[i],
      operator: null,
      right: null
    };
    leftSide.right = newLeftSide;
    leftSide = newLeftSide;
  }
  return eq;
}

const termRegexp = /(\d*)(x?)(\^?)(\d*)/;
export function strToTerm (str: string): EquationTerm {
  let match = str.match(termRegexp);
  if (!match) {
    throw new Error('Unrecognized term: ' + str);
  }
  let coefficient = match[1];
  let variable = match[2];
  let carat = match[3];
  let power = match[4];
  if (!variable && (carat || power)) {
    throw new Error('Power without variable: ' + str);
  }
  if (!variable) {
    return Number(coefficient);
  }
  return {
    coefficient: Number(coefficient),
    variable: variable,
    power: Number(power) || 1
  };
}
