import { useState } from 'react'
import { ACTIVITY_LEVELS, calculateREE, calculateTDEE } from './lib/calories'

// Shared styles, so every field looks the same
const labelClass = 'block text-sm font-medium text-gray-800'
const fieldClass =
  'mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 ' +
  'text-base text-gray-900 focus:border-emerald-700 focus:outline-none ' +
  'focus:ring-2 focus:ring-emerald-700/30'

function App() {
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [sex, setSex] = useState('')
  const [activityLevel, setActivityLevel] = useState('')
  const [result, setResult] = useState(null)

  // Creates an onChange handler that updates one field
  // and clears the old result, so it never shows outdated numbers
  function updateField(setter) {
    return (event) => {
      setter(event.target.value)
      setResult(null)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    // Form inputs are always text, so convert them to numbers
    const inputs = {
      age: Number(age),
      heightCm: Number(height),
      weightKg: Number(weight),
      sex,
    }

    setResult({
      ree: calculateREE(inputs),
      tdee: calculateTDEE(inputs, activityLevel),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-md px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Calorie Calculator & Tracker
          </h1>
          <p className="mt-1 text-gray-600">
            Estimate your daily calorie needs and track your food intake.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900">Your details</h2>

          <div>
            <label htmlFor="age" className={labelClass}>
              Age (years)
            </label>
            <input
              id="age"
              type="number"
              min="18"
              max="100"
              step="1"
              value={age}
              onChange={updateField(setAge)}
              required
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="height" className={labelClass}>
                Height (cm)
              </label>
              <input
                id="height"
                type="number"
                min="100"
                max="250"
                step="0.1"
                placeholder="e.g. 175"
                value={height}
                onChange={updateField(setHeight)}
                required
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="weight" className={labelClass}>
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                min="30"
                max="300"
                step="0.1"
                placeholder="e.g. 70.5"
                value={weight}
                onChange={updateField(setWeight)}
                required
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="sex" className={labelClass}>
              Sex used for the equation
            </label>
            <select
              id="sex"
              value={sex}
              onChange={updateField(setSex)}
              required
              className={fieldClass}
            >
              <option value="">Select an option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="activity" className={labelClass}>
              Activity level
            </label>
            <select
              id="activity"
              value={activityLevel}
              onChange={updateField(setActivityLevel)}
              required
              aria-describedby="activity-help"
              className={fieldClass}
            >
              <option value="">Select your activity level</option>
              {Object.entries(ACTIVITY_LEVELS).map(([key, level]) => (
                <option key={key} value={key}>
                  {level.label}
                </option>
              ))}
            </select>
            <p id="activity-help" className="mt-2 text-sm text-gray-600">
              Think about your whole day, including work, not just exercise.
              Sedentary: desk job, little exercise. Active: on your feet at
              work or about an hour of exercise daily. Vigorous: heavy
              physical work or several hours of exercise daily.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            Calculate my needs
          </button>
        </form>

        {result && (
          <section
            aria-live="polite"
            className="mt-6 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200"
          >
            <h2 className="text-sm font-medium text-emerald-900">
              Estimated maintenance calories
            </h2>
            <p className="mt-1 text-4xl font-bold text-emerald-800">
              {Math.round(result.tdee)}
              <span className="ml-1 text-base font-medium">kcal/day</span>
            </p>
            <p className="mt-3 text-sm text-gray-700">
              Resting energy expenditure: {Math.round(result.ree)} kcal/day
            </p>
            <p className="mt-3 text-xs text-gray-600">
              This is an estimate, not a measurement or medical advice. It is
              intended for adults and is not suitable during pregnancy or
              breastfeeding.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}

export default App