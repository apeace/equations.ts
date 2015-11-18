/// <reference path="../typings/tsd.d.ts" />

import expect = require('expect.js');

import equation = require('../lib/equation');

describe('Equation', () => {

  let Op = equation.Operator;
  let variable = equation.variable;
  let eq = equation.equation;

  describe('strToEq', () => {

    let strToEq = equation.strToEq;

    it('Works', () => {
      let str = '4x^2 + 3x + 2';
      let expectedResult = eq(
        variable(4, 'x', 2),
        Op.Plus,
        eq(
          variable(3, 'x', 1),
          Op.Plus,
          eq(2)
        )
      );
      let result = strToEq(str);
      expect(result).to.eql(expectedResult);
    });

  }); // end strToEq

});
