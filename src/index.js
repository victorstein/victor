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
<<<<<<< HEAD
import '@babel/polyfill'
=======
import { hot } from 'react-hot-loader/root'
>>>>>>> f2bf8d1623fc0316c265bca9d2b38c02f74c7d8e
import React from 'react'
import { MemoryRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import AuthLayout from 'layouts/Auth/Auth.jsx'
import AdminLayout from 'layouts/Admin/Admin.jsx'
import RTLLayout from 'layouts/RTL/RTL.jsx'

import 'assets/css/nucleo-icons.css'
import 'assets/scss/black-dashboard-pro-react.scss?v=1.0.0'
import 'assets/demo/demo.css'
import 'react-notification-alert/dist/animate.css'

const main = () => (
  <Router>
    <Switch>
      <Route path='/auth' render={props => <AuthLayout {...props} />} />
      <Route path='/admin' render={props => <AdminLayout {...props} />} />
      <Route path='/rtl' render={props => <RTLLayout {...props} />} />
      <Redirect from='/' to='/admin/dashboard' />
    </Switch>
  </Router>
)

export default hot(main)
