import { useState } from 'react'
import './App.css'
import { ACTIVITY_LEVELS, calculateREE, calculateTDEE } from './lib/calories'

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
    <main>
      <h1>Calorie Calculator & Tracker</h1>
      <p>Estimate your daily calorie needs and track your food intake.</p>

      <h2>Your details</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="age">Age (years): </label>
          <input
            id="age"
            type="number"
            min="18"
            max="100"
            step="1"
            value={age}
            onChange={updateField(setAge)}
            required
          />
        </div>

        <div>
          <label htmlFor="height">Height (cm): </label>
          <input
            id="height"
            type="number"
            min="100"
            max="250"
            step="0.1"
            placeholder="For example, 175"
            value={height}
            onChange={updateField(setHeight)}
            required
          />
        </div>

        <div>
          <label htmlFor="weight">Weight (kg): </label>
          <input
            id="weight"
            type="number"
            min="30"
            max="300"
            step="0.1"
            placeholder="For example, 70.5"
            value={weight}
            onChange={updateField(setWeight)}
            required
          />
        </div>

        <div>
          <label htmlFor="sex">Sex used for the equation: </label>
          <select id="sex" value={sex} onChange={updateField(setSex)} required>
            <option value="">Select an option</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="activity">Activity level: </label>
          <select
            id="activity"
            value={activityLevel}
            onChange={updateField(setActivityLevel)}
            required
          >
            <option value="">Select your activity level</option>
            {Object.entries(ACTIVITY_LEVELS).map(([key, level]) => (
              <option key={key} value={key}>
                {level.label}
              </option>
            ))}
          </select>
          <p>
            Think about your whole day, including work, not just exercise.
            Sedentary: desk job, little exercise. Active: on your feet at work
            or about an hour of exercise daily. Vigorous: heavy physical work
            or several hours of exercise daily.
          </p>
        </div>

        <button type="submit">Calculate my needs</button>
      </form>

      {result && (
        <section>
          <h2>Your estimate</h2>
          <p>
            Estimated maintenance calories:{' '}
            <strong>{Math.round(result.tdee)} kcal/day</strong>
          </p>
          <p>Resting energy expenditure: {Math.round(result.ree)} kcal/day</p>
          <p>
            This is an estimate, not a measurement or medical advice. It is
            intended for adults and is not suitable during pregnancy or
            breastfeeding.
          </p>
        </section>
      )}
    </main>
  )
}

export default App