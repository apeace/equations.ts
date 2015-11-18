/// <reference path="../typings/tsd.d.ts" />

import expect = require('expect.js');

import equation = require('../lib/equation');

describe('Equation', () => {

  let Op = equation.Op;
  let v = equation.v;
  let eq = equation.eq;

  describe('strToEq', () => {

    let strToEq = equation.strToEq;

    it('Detects errors', () => {
      let testError = (str: string, err: RegExp) => {
        expect(() => {
          strToEq(str);
        }).to.throwError(err);
      };
      testError('4y + 1', /unrecognized term/i);
      testError('4^3', /unrecognized term/i);
      testError('+ 4x', /unable to parse/i);
      testError('+ ', /unable to parse/i);
      testError('4x +', /too many operators/i);
    });

    it('Parses constant', () => {
      let str = '123';
      let expectedResult = eq(123);
      let result = strToEq(str);
      expect(result).to.eql(expectedResult);
    });

    it('Parses linear with no constant', () => {
      let str = '3x';
      let expectedResult = eq(v(3, 'x', 1));
      let result = strToEq(str);
      expect(result).to.eql(expectedResult);
    });

    it('Parses linear with constant', () => {
      let str = '3x - 5';
      let expectedResult = eq(
        v(3, 'x', 1),
        Op.Minus,
        eq(5)
      );
      let result = strToEq(str);
      expect(result).to.eql(expectedResult);
    });

    it('Parses quadratic', () => {
      let str = '4x^2 + 3x + 2';
      let expectedResult = eq(
        v(4, 'x', 2),
        Op.Plus,
        eq(
          v(3, 'x', 1),
          Op.Plus,
          eq(2)
        )
      );
      let result = strToEq(str);
      expect(result).to.eql(expectedResult);
    });

  }); // end strToEq

});
