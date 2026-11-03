import { useState } from 'react'
import { MEAL_CATEGORIES, entryCalories } from '../lib/food'
import {
  labelClass,
  fieldClass,
  primaryButtonClass,
  secondaryButtonClass,
} from './formstyles'

function AddFoodForm({ onAdd, onCancel }) {
  const [name, setName] = useState('')
  const [caloriesPerServing, setCaloriesPerServing] = useState('')
  const [servings, setServings] = useState('1')
  const [meal, setMeal] = useState(MEAL_CATEGORIES[0])

  // Live preview of the entry total while typing
  const preview =
    caloriesPerServing !== '' && servings !== ''
      ? Math.round(
          entryCalories({
            caloriesPerServing: Number(caloriesPerServing),
            servings: Number(servings),
          }),
        )
      : null

  function handleSubmit(event) {
    event.preventDefault()
    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      caloriesPerServing: Number(caloriesPerServing),
      servings: Number(servings),
      meal,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200"
    >
      <h2 className="text-lg font-semibold text-gray-900">Add food</h2>

      <div>
        <label htmlFor="food-name" className={labelClass}>
          Food name
        </label>
        <input
          id="food-name"
          type="text"
          maxLength="100"
          pattern=".*\S.*"
          title="Enter a food name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="food-calories" className={labelClass}>
            kcal per serving
          </label>
          <input
            id="food-calories"
            type="number"
            min="0"
            max="10000"
            step="1"
            value={caloriesPerServing}
            onChange={(event) => setCaloriesPerServing(event.target.value)}
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="food-servings" className={labelClass}>
            Servings
          </label>
          <input
            id="food-servings"
            type="number"
            min="0.01"
            max="100"
            step="0.01"
            value={servings}
            onChange={(event) => setServings(event.target.value)}
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="food-meal" className={labelClass}>
          Meal
        </label>
        <select
          id="food-meal"
          value={meal}
          onChange={(event) => setMeal(event.target.value)}
          className={fieldClass}
        >
          {MEAL_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <p aria-live="polite" className="text-sm text-gray-700">
        {preview !== null ? `This entry: ${preview} kcal` : ' '}
      </p>

      <div className="flex gap-3">
        <button type="submit" className={`flex-1 ${primaryButtonClass}`}>
          Save entry
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`flex-1 ${secondaryButtonClass}`}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddFoodForm