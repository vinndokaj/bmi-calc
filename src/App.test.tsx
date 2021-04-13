import { validateAux, calculateBMI } from './utils/validate'

describe('validateAux test cases', () => {
  it('should return false for validateAux("text", "")', () => {
    expect(validateAux("text", "")).toBe(false);
  })
  it('should return false for validateAux("text", "123")', () => {
    expect(validateAux("text", "123")).toBe(false);
  })
  it('should return false for validateAux("text", "-123")', () => {
    expect(validateAux("text", "-123")).toBe(false);
  })
  it('should return true for validateAux("text", "name")', () => {
    expect(validateAux("text", "name")).toBe(true);
  })
  it('should return true for validateAux("text", "first last")', () => {
    expect(validateAux("text", "first last")).toBe(true);
  })
  it('should return false for validateAux("number", "")', () => {
    expect(validateAux("number", "")).toBe(false);
  })
  it('should return false for validateAux("number", "some text")', () => {
    expect(validateAux("number", "some text")).toBe(false);
  })
  it('should return false for validateAux("number", "-1")', () => {
    expect(validateAux("number", "-1")).toBe(false);
  })
  it('should return false for validateAux("number", "0")', () => {
    expect(validateAux("number", "0")).toBe(false);
  })
  it('should return true for validateAux("number", "1")', () => {
    expect(validateAux("number", "1")).toBe(true);
  })
  it('should return true for validateAux("select-one", "")', () => {
    expect(validateAux("select-one", "")).toBe(false);
  })
  it('should return false for validateAux("select-one", "some text")', () => {
    expect(validateAux("select-one", "some text")).toBe(false);
  })
  it('should return false for validateAux("select-one", "-1")', () => {
    expect(validateAux("select-one", "-1")).toBe(false);
  })
  it('should return false for validateAux("select-one", "0")', () => {
    expect(validateAux("select-one", "0")).toBe(false);
  })
  it('should return true for validateAux("select-one", "1")', () => {
    expect(validateAux("select-one", "1")).toBe(true);
  })
  it('should return false for validateAux("", "")', () => {
    expect(validateAux("", "")).toBe(false);
  })
  it('should return false for validateAux("123", "123")', () => {
    expect(validateAux("123", "123")).toBe(false);
  })
})

describe("BMI Calc Test Cases", () => {
  it('calculateBMI(0,0) should be NaN', () => {
    expect(calculateBMI(0,0)).toBeNaN();
  })
  it('calculateBMI(-70,180) should be less than 0', () => {
    expect(calculateBMI(-70, 180)).toBeLessThan(0);
  })
})