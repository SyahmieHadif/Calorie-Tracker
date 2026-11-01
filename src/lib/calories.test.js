import { describe, it, expect } from 'vitest'
import { calculateREE, calculateTDEE } from './calories'

const man = { age: 30, heightCm: 175, weightKg: 70, sex: 'male' }
const woman = { age: 30, heightCm: 160, weightKg: 60, sex: 'female' }

describe('calculateREE', () => {
  it('calculates REE for the male equation', () => {
    // 10×70 + 6.25×175 − 5×30 + 5 = 1648.75
    expect(calculateREE(man)).toBeCloseTo(1648.75)
  })

  it('calculates REE for the female equation', () => {
    // 10×60 + 6.25×160 − 5×30 − 161 = 1289
    expect(calculateREE(woman)).toBeCloseTo(1289)
  })

  it('rejects an unknown sex value', () => {
    expect(() => calculateREE({ ...man, sex: 'other' })).toThrow()
  })
})

describe('calculateTDEE', () => {
  it('applies the sedentary factor', () => {
    // 1648.75 × 1.55 = 2555.5625
    expect(calculateTDEE(man, 'sedentary')).toBeCloseTo(2555.5625)
  })

  it('applies the vigorous factor', () => {
    // 1289 × 2.2 = 2835.8
    expect(calculateTDEE(woman, 'vigorous')).toBeCloseTo(2835.8)
  })

  it('rejects an unknown activity level', () => {
    expect(() => calculateTDEE(man, 'extreme')).toThrow()
  })
})