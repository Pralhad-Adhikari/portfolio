import React, { useMemo, useRef, useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'

import Topnav from './components/topnav/topnav'
import Services from  './components/services/services'
import Mywork from './components/mywork/mywork'
import Resume from './components/resume/resume'
import Contact from './components/contact/contact'
import './app.css'

const App = () => {
  const contentRef = useRef(null)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
  }, [theme])

  const handleNavigate = (target) => {
    if (target === 'dashboard') {
      if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(target)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className='layout'>
      <Header onNavigate={handleNavigate} theme={theme} onChangeTheme={setTheme} />
      <div className="content" ref={contentRef}>
        <Topnav/>
        <section id="dashboard">
          <Hero />
        </section>
        <section id="services">
          <Services/>
        </section>
        <section id="mywork">
          <Mywork/>
        </section>
        <section id="resume">
          <Resume/>
        </section>
        <section id="contact">
          <Contact/>
        </section>
      </div>
    </div>
  )
}

export default App