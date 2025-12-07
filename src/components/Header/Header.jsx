import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faEnvelope,
  faBriefcase,
  faBrain,
  faWrench,
  faPalette,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from '../../assets/profile.jpg';

const Header = ({ onNavigate, theme, onChangeTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)

  const go = (target) => {
    onNavigate && onNavigate(target)
    setMenuOpen(false)
  }

  const selectTheme = (value) => {
    onChangeTheme && onChangeTheme(value)
    setThemeOpen(false)
  }

  return (
    <div className="header">
      <div className="header-top">
        {/* Left: Name and Email */}
        <div className="header-left">
          <img src={logo} alt="Logo" className="header-logo" />
          <div className="username">
            Pralhad <span className="gmail">pralhada73@gmail.com</span>
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Center: Navigation Menu */}
        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <li onClick={() => go('dashboard')}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </li>
          <li onClick={() => go('contact')}>
            <FontAwesomeIcon icon={faEnvelope} /> Contact
          </li>
          <li onClick={() => go('resume')}>
            <FontAwesomeIcon icon={faBriefcase} /> Resume
          </li>
          <li onClick={() => go('services')}>
            <FontAwesomeIcon icon={faBrain} /> Skill
          </li>
          <li onClick={() => go('mywork')}>
            <FontAwesomeIcon icon={faWrench} /> Works
          </li>
        </ul>

        {/* Right: Theme only */}
        <div className="nav-right">
          <div className="theme-dropdown">
            <button className="theme-button" onClick={() => setThemeOpen((v) => !v)}>
              <FontAwesomeIcon icon={faPalette} /> Theme
            </button>
            {themeOpen && (
              <div className="theme-menu">
                <button className={theme === 'light' ? 'active' : ''} onClick={() => selectTheme('light')}>Light</button>
                <button className={theme === 'dark' ? 'active' : ''} onClick={() => selectTheme('dark')}>Dark</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
