import { useEffect, useState } from 'react'
import './assets/styles/scss/global.scss'
import { userService } from './services/user.service'
import { SignupPage } from './pages/SignupPage'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticsPage } from './pages/StatisticsPage'
import { AppHeader } from './cmps/AppHeader'
import { Route, Routes, HashRouter as Router, Link } from 'react-router-dom'
import { ContactDetailsPage } from './pages/ContactDetailsPage'
import { ContactEditPage } from './pages/ContactEditPage'

function App() {

  const [user, setUser] = useState(null)
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false)

  useEffect(() => {
    const loggedInUser = userService.getLoggedinUser()
    if (loggedInUser) {
      setUser(loggedInUser)
    }
    setIsInitialCheckDone(true)
  }, [])

  if (!isInitialCheckDone) {
    return <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  }

  return (
    <Router>
      <section className="main-app">
        <AppHeader />
        <main className="container">
          <Routes>
            <Route path="/" element={user ? <HomePage /> : <SignupPage setUser={setUser} />} />
            <Route path="/contact" element={user ? <ContactPage /> : <SignupPage setUser={setUser} />} />
            <Route path="/contact/:id" element={user ? <ContactDetailsPage /> : <SignupPage setUser={setUser} />} />
            <Route path="/contact/edit/:id?" element={user ? <ContactEditPage /> : <SignupPage setUser={setUser} />} />
            <Route path="/statistics" element={user ? <StatisticsPage /> : <SignupPage setUser={setUser} />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
