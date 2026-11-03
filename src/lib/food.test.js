import { describe, it, expect } from 'vitest'
import { entryCalories, totalCalories, describeDifference } from './food'

const yogurt = { caloriesPerServing: 120, servings: 1.5 }
const rice = { caloriesPerServing: 200, servings: 2 }

describe('entryCalories', () => {
  it('handles fractional servings', () => {
    // Example from the project plan: 120 × 1.5 = 180
    expect(entryCalories(yogurt)).toBeCloseTo(180)
  })

  it('allows zero-calorie entries', () => {
    expect(entryCalories({ caloriesPerServing: 0, servings: 1 })).toBe(0)
  })
})

describe('totalCalories', () => {
  it('returns 0 for an empty list', () => {
    expect(totalCalories([])).toBe(0)
  })

  it('adds up all entries', () => {
    // 180 + 400 = 580
    expect(totalCalories([yogurt, rice])).toBeCloseTo(580)
  })
})

describe('describeDifference', () => {
  it('describes intake above target', () => {
    expect(describeDifference(2350, 2200)).toBe('150 kcal above target')
  })

  it('describes intake below target', () => {
    expect(describeDifference(2000, 2200)).toBe('200 kcal below target')
  })

  it('describes intake equal to target', () => {
    expect(describeDifference(2200, 2200)).toBe('On target')
  })

  it('rounds tiny differences to on target', () => {
    expect(describeDifference(2200.4, 2200)).toBe('On target')
  })
})