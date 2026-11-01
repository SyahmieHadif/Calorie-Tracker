// Calorie estimate calculations.
// REE: Mifflin–St Jeor equation (Mifflin et al., 1990).
// Activity factors: midpoints of the FAO/WHO/UNU (2004) PAL bands.

export const ACTIVITY_LEVELS = {
  sedentary: { factor: 1.55, label: 'Sedentary or light activity' },
  active: { factor: 1.85, label: 'Active or moderately active' },
  vigorous: { factor: 2.2, label: 'Vigorous or vigorously active' },
}

// Resting energy expenditure in kcal/day
export function calculateREE({ age, heightCm, weightKg, sex }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age

  if (sex === 'male') return base + 5
  if (sex === 'female') return base - 161

  throw new Error(`Unknown sex value: ${sex}`)
}

// Estimated total daily energy expenditure (maintenance calories)
export function calculateTDEE(inputs, activityLevel) {
  const level = ACTIVITY_LEVELS[activityLevel]

  if (!level) {
    throw new Error(`Unknown activity level: ${activityLevel}`)
  }

  return calculateREE(inputs) * level.factor
}