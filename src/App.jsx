import { useState } from 'react'
import './App.css'

function App() {
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [sex, setSex] = useState('')
  const [activityLevel, setActivityLevel] =useState('')

  function handleSubmit(event) {
    event.preventDefault()
    alert('Your details are ready for calculation!')
}
  return (
    <main>
      <h1>Calorie Calculator & Tracker</h1>
      <p>
        Estimate your daily calorie needs and track your food intake.
      </p>

      <h2>Your details</h2>

      <label htmlFor="age">Age (years): </label>
      <input
        id="age"
        type="number"
        min="18"
        step="1"
        placeholder="Enter your age"
        value={age}
        onChange={(event) => setAge(event.target.value)}
        required
      />

      <div>
  <label htmlFor="height">Height (cm): </label>
  <input
    id="height"
    type="number"
    min="1"
    step="0.1"
    placeholder="For example, 175"
    value={height}
    onChange={(event) => setHeight(event.target.value)}
    required
  />
</div>

<div>
  <label htmlFor="weight">Weight (kg): </label>
  <input
    id="weight"
    type="number"
    min="1"
    step="0.1"
    placeholder="For example, 70.5"
    value={weight}
    onChange={(event) => setWeight(event.target.value)}
    required
  />

</div>

<div>
  <label htmlFor="sex">Sex used for the equation: </label>
  <select
    id="sex"
    value={sex}
    onChange={(event) => setSex(event.target.value)}
    required
  >
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
    onChange={(event) => setActivityLevel(event.target.value)}
    required
  >
    <option value="">Select your activity level</option>
    <option value="sedentary">Sedentary</option>
    <option value="light">Lightly active</option>
    <option value="moderate">Moderately active</option>
    <option value="high">Very active</option>
  </select>
</div>

<form onSubmit={handleSubmit}>
  <button type="submit">Check my details</button>
</form>
<h2>Your entered details</h2>
<p>Age: {age || 'Not entered yet'} years</p>
<p>Height: {height || 'Not entered yet'} cm</p>
<p>Weight: {weight || 'Not entered yet'} kg</p>
<p>Sex: {sex || 'Not selected yet'}</p>
<p>Activity level: {activityLevel || 'Not selected yet'}</p>
    </main>
  )
}

export default App