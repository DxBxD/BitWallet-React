import { useState } from 'react'
// import './assets/styles/App.css'
import './assets/styles/scss/global.scss'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticsPage } from './pages/StatisticsPage'
import { AppHeader } from './cmps/AppHeader'
import { Route, Routes, HashRouter as Router, Link } from 'react-router-dom';
import { ContactDetailsPage } from './pages/ContactDetailsPage'
import { ContactEditPage } from './pages/ContactEditPage'

function App() {

  return (
    <Router>
      <section className="main-app">
        <AppHeader />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact/:id" element={<ContactDetailsPage />} />
            <Route path="/contact/edit/:id?" element={<ContactEditPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
