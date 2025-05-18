const Calculator = require('../src/calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(calculator.add(-2, 3)).toBe(1);
      expect(calculator.add(2, -3)).toBe(-1);
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    it('should handle zero', () => {
      expect(calculator.add(0, 3)).toBe(3);
      expect(calculator.add(2, 0)).toBe(2);
      expect(calculator.add(0, 0)).toBe(0);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers correctly', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    it('should handle negative numbers', () => {
      expect(calculator.subtract(-2, 3)).toBe(-5);
      expect(calculator.subtract(2, -3)).toBe(5);
      expect(calculator.subtract(-2, -3)).toBe(1);
    });

    it('should handle zero', () => {
      expect(calculator.subtract(0, 3)).toBe(-3);
      expect(calculator.subtract(2, 0)).toBe(2);
      expect(calculator.subtract(0, 0)).toBe(0);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(calculator.multiply(2, 3)).toBe(6);
    });

    it('should handle negative numbers', () => {
      expect(calculator.multiply(-2, 3)).toBe(-6);
      expect(calculator.multiply(2, -3)).toBe(-6);
      expect(calculator.multiply(-2, -3)).toBe(6);
    });

    it('should handle zero', () => {
      expect(calculator.multiply(0, 3)).toBe(0);
      expect(calculator.multiply(2, 0)).toBe(0);
      expect(calculator.multiply(0, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers correctly', () => {
      expect(calculator.divide(6, 3)).toBe(2);
    });

    it('should handle negative numbers', () => {
      expect(calculator.divide(-6, 3)).toBe(-2);
      expect(calculator.divide(6, -3)).toBe(-2);
      expect(calculator.divide(-6, -3)).toBe(2);
    });

    it('should handle zero dividend', () => {
      expect(calculator.divide(0, 3)).toBe(0);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(6, 0)).toThrow('Division by zero is not allowed');
    });
  });
});