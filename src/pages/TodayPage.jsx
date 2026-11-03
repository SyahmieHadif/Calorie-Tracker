import { useState } from 'react'
import AddFoodForm from '../components/AddFoodForm'
import { primaryButtonClass } from '../components/formstyles'
import {
  MEAL_CATEGORIES,
  entryCalories,
  totalCalories,
  describeDifference,
} from '../lib/food'

// Made-up sample data until the database is connected (Milestone 4)
const SAMPLE_TARGET = 2200
const SAMPLE_ENTRIES = [
  { id: 'sample-1', name: 'Nasi lemak', caloriesPerServing: 400, servings: 1, meal: 'Breakfast' },
  { id: 'sample-2', name: 'Teh tarik', caloriesPerServing: 120, servings: 1, meal: 'Breakfast' },
  { id: 'sample-3', name: 'Greek yogurt', caloriesPerServing: 120, servings: 1.5, meal: 'Snack' },
]

function TodayPage() {
  const [entries, setEntries] = useState(SAMPLE_ENTRIES)
  const [isAdding, setIsAdding] = useState(false)

  const logged = totalCalories(entries)
  const today = new Date().toLocaleDateString('en-MY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  function handleAdd(entry) {
    setEntries([...entries, entry])
    setIsAdding(false)
  }

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Today</h1>
        <p className="mt-1 text-gray-600">{today}</p>
      </header>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Target</p>
            <p className="text-2xl font-bold text-gray-900">
              {SAMPLE_TARGET} <span className="text-sm font-medium">kcal</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Logged</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(logged)} <span className="text-sm font-medium">kcal</span>
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-700">
          {describeDifference(logged, SAMPLE_TARGET)}
        </p>
      </section>

      {isAdding ? (
        <AddFoodForm onAdd={handleAdd} onCancel={() => setIsAdding(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className={`w-full ${primaryButtonClass}`}
        >
          + Add food
        </button>
      )}

      {entries.length === 0 ? (
        <p className="text-center text-gray-600">No food logged yet today.</p>
      ) : (
        MEAL_CATEGORIES.map((meal) => {
          const mealEntries = entries.filter((entry) => entry.meal === meal)
          if (mealEntries.length === 0) return null

          return (
            <section key={meal}>
              <div className="flex items-baseline justify-between">
                <h2 className="font-semibold text-gray-900">{meal}</h2>
                <p className="text-sm text-gray-600">
                  {Math.round(totalCalories(mealEntries))} kcal
                </p>
              </div>
              <ul className="mt-2 divide-y divide-gray-200 rounded-2xl bg-white ring-1 ring-gray-200">
                {mealEntries.map((entry) => (
                  <li key={entry.id} className="flex justify-between px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{entry.name}</p>
                      <p className="text-sm text-gray-600">
                        {entry.servings} × {entry.caloriesPerServing} kcal
                      </p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {Math.round(entryCalories(entry))} kcal
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )
        })
      )}

      <p className="text-center text-xs text-gray-500">
        Sample data: entries reset when you refresh the page.
      </p>
    </main>
  )
}

export default TodayPage