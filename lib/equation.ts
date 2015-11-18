export enum Op {
  Plus, Minus
}

export interface Variable {
  coefficient: number;
  variable: string;
  power: number;
}

export type Constant = number;

export type Term = Variable|Constant;

export interface Equation {
  left: Term;
  operator?: Op;
  right?: Equation;
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
