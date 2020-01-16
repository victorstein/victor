/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

*/
import React, { createContext, useReducer } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { MemoryRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import AuthLayout from 'layouts/Auth/Auth.jsx'
import AdminLayout from 'layouts/Admin/Admin.jsx'
import RTLLayout from 'layouts/RTL/RTL.jsx'

import initialState from './store/initialState'
import reducer from './store/reducer'

import 'assets/css/nucleo-icons.css'
import 'assets/scss/black-dashboard-pro-react.scss?v=1.0.0'
import 'assets/demo/demo.css'
import 'react-notification-alert/dist/animate.css'

export default () => (
  const [state, dispatch] = useReducer(reducer, initialState)
  <ApolloProvider client={client}>
  <GlobalContext.Provider value={{ state: state, dispatch: dispatch }}>
  <Router>
    <Switch>
      <Route path='/auth' render={props => <AuthLayout {...props} />} />
      <Route path='/admin' render={props => <AdminLayout {...props} />} />
      <Route path='/rtl' render={props => <RTLLayout {...props} />} />
      <Redirect from='/' to='/admin/dashboard' />
    </Switch>
  </Router>
  </GlobalContext.Provider>
  </ApolloProvider>
)
