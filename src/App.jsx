import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import CalculatorPage from './pages/CalculatorPage'
import TodayPage from './pages/TodayPage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CalculatorPage />} />
        <Route path="today" element={<TodayPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App