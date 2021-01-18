import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './css/sidebar.css'
import Logo from '../images/logo.svg'

class Sidebar extends Component {
  state = {}
  render() {
    return (
      <div className="sidebar">
        <img src={Logo} className="logo" alt="Logo" />
        <NavLink to="/" exact activeClassName="active">
          Installation
        </NavLink>
        <NavLink
          to="/components/"
          activeClassName="active"
          style={{ pointerEvents: 'none' }}
        >
          Components
        </NavLink>
        <div className="subMenu">
          <NavLink to="/components/cta-buttons" activeClassName="active">
            CTA Buttons
          </NavLink>
          <NavLink to="/components/round-buttons" activeClassName="active">
            Round Buttons
          </NavLink>
          <NavLink to="/components/toggles" activeClassName="active">
            Toggles
          </NavLink>
          <NavLink to="/components/forms" activeClassName="active">
            Forms
          </NavLink>
          <NavLink to="/components/tooltips" activeClassName="active">
            Tooltips
          </NavLink>
          <NavLink to="/components/badges" activeClassName="active">
            Badges
          </NavLink>
          <NavLink to="/components/shadows" activeClassName="active">
            Shadows
          </NavLink>
          <NavLink to="/components/colours" activeClassName="active">
            Colours
          </NavLink>
          <NavLink to="/components/icon-library" activeClassName="active">
            Icons Library
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Sidebar
