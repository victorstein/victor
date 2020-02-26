/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import { Route, Switch } from 'react-router-dom'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'
// react plugin for creating notifications over the dashboard
import { Row, Col } from 'reactstrap'

// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.jsx'
import Footer from 'components/Footer/Footer.jsx'
import Sidebar from 'components/Sidebar/Sidebar.jsx'

//import routes from "routes.js";
import routes from '../../routes.js'

import logo from 'assets/img/react-logo.png'

import './styles.css'

var ps

class Admin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeColor: 'blue',
      sidebarMini: true,
      opacity: 0,
      sidebarOpened: false,
      fullContent: false,
    }
  }

  sideBarFullContent = fullContent => {
    let findSidebar = document.querySelectorAll('.sidebarToggle')
    if (fullContent) {
      if (findSidebar) {
        findSidebar[0].classList.add('sidebar-full-content')
      }
    } else {
      if (findSidebar) {
        findSidebar[0].classList.remove('sidebar-full-content')
      }
    }
  }
  componentDidMount () {
    this.sideBarFullContent(this.props.fullContent)
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on'
      document.documentElement.classList.remove('perfect-scrollbar-off')
      ps = new PerfectScrollbar(this.refs.mainPanel)
      let tables = document.querySelectorAll('.table-responsive')
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i])
      }
    }
    window.addEventListener('scroll', this.showNavbarButton)
  }
  componentWillUnmount () {
    if (navigator.platform.indexOf('Win') > -1) {
      if (ps.destroy) {
        ps.destroy()
      }
      document.documentElement.className += ' perfect-scrollbar-off'
      document.documentElement.classList.remove('perfect-scrollbar-on')
    }
    window.removeEventListener('scroll', this.showNavbarButton)
  }
  componentDidUpdate (e) {
    if (
      e.routerProps.location.pathname !==
      e.routerProps.history.location.pathname
    ) {
      let fullContent = false
      routes.forEach((value, index) => {
        if (
          value.fullContent &&
          e.routerProps.history.location.pathname === value.layout + value.path
        ) {
          fullContent = true
        }
      })
      this.sideBarFullContent(fullContent)
      if (navigator.platform.indexOf('Win') > -1) {
        let tables = document.querySelectorAll('.table-responsive')
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i])
        }
      }
      document.documentElement.scrollTop = 0
      document.scrollingElement.scrollTop = 0
      this.refs.mainPanel.scrollTop = 0
    }
  }
  showNavbarButton = () => {
    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      this.refs.mainPanel.scrollTop > 50
    ) {
      this.setState({ opacity: 1 })
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      this.refs.mainPanel.scrollTop <= 50
    ) {
      this.setState({ opacity: 0 })
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views)
      }
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      )
    })
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color })
  }
  handleMiniClick = () => {
    if (this.props.fullContent) {
      let findSidebar = document.querySelectorAll('.sidebarToggle')
      if (findSidebar) {
        findSidebar[0].classList.toggle('sidebar-full-content')
      }
    }
    if (document.body.classList.contains('sidebar-mini')) {
      this.setState({ sidebarMini: false })
    } else {
      this.setState({ sidebarMini: true })
    }
    document.body.classList.toggle('sidebar-mini')
  }
  toggleSidebar = () => {
    this.setState({
      sidebarOpened: !this.state.sidebarOpened,
    })
    document.documentElement.classList.toggle('nav-open')
  }
  closeSidebar = () => {
    this.setState({
      sidebarOpened: false,
    })
    document.documentElement.classList.remove('nav-open')
  }
  render () {
    return (
      <div className='wrapper'>
        <div
          className='navbar-minimize-fixed'
          style={{ opacity: this.state.opacity }}
        >
          <button
            className='minimize-sidebar btn btn-link btn-just-icon'
            onClick={this.handleMiniClick}
          >
            <i className='tim-icons icon-align-center visible-on-sidebar-regular text-muted' />
            <i className='tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted' />
          </button>
        </div>

        <Sidebar
          {...this.props.routerProps}
          routes={routes}
          activeColor={this.state.activeColor}
          logo={{
            outterLink: 'https://www.creative-tim.com/',
            text: 'Creative Tim',
            imgSrc: logo,
          }}
          closeSidebar={this.closeSidebar}
        />

        <div
          className='main-panel'
          ref='mainPanel'
          data={this.state.activeColor}
        >
          <AdminNavbar
            {...this.props.routerProps}
            handleMiniClick={this.handleMiniClick}
            sidebarOpened={this.state.sidebarOpened}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className={this.props.fullContent ? 'contentFull px-3' : 'content'}
          >
            <Row className='scrollContent'>
              <Col xs='12'>
                <Switch>{this.getRoutes(routes)}</Switch>
              </Col>
            </Row>
          </div>
          <div className='mt-3 mb-5'>
            <Footer fluid />
          </div>
        </div>
      </div>
    )
  }
}

export default Admin
