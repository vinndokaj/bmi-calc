import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { validateAux, validateEntry } from './validate'

describe('validateAux test cases', () => {
  it('should return false for validateAux("text", "")', () => {
    expect(validateAux("text", "")).toBe(false);
  })
  it('should return false for validateAux("number", "")', () => {
    expect(validateAux("number", "")).toBe(false);
  })
  it('should return false for validateAux("select", "")', () => {
    expect(validateAux("select", "")).toBe(false);
  })
  it('should return false for validateAux("text", "123")', () => {
    expect(validateAux("text", "123")).toBe(false);
  })
  it('should return false for validateAux("number", "some text")', () => {
    expect(validateAux("number", "some text")).toBe(false);
  })
  it('should return false for validateAux("", "")', () => {
    expect(validateAux("", "")).toBe(false);
  })
  it('should return false for validateAux("123", "123")', () => {
    expect(validateAux("123", "123")).toBe(false);
  })
})