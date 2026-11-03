export const MEAL_CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

// Calories for one entry: calories per serving × number of servings
export function entryCalories(entry) {
  return entry.caloriesPerServing * entry.servings
}

// Total calories across a list of entries
export function totalCalories(entries) {
  return entries.reduce((sum, entry) => sum + entryCalories(entry), 0)
}

// Neutral wording comparing logged calories with the target
export function describeDifference(logged, target) {
  const difference = Math.round(logged - target)

  if (difference > 0) return `${difference} kcal above target`
  if (difference < 0) return `${-difference} kcal below target`
  return 'On target'
}