/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

*/

// import { hot } from 'react-hot-loader/root'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React, { createContext, useReducer } from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import {
  MemoryRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import AuthLayout from 'layouts/Auth/Auth.jsx'

import AdminLayout from 'layouts/Admin/index.js'

import BlockScreen from './components/BlockScreen'
import initialState from './store/initialState'
import reducer from './store/reducer'
import client from './apolloClient'

import 'assets/css/nucleo-icons.css'
import 'assets/scss/black-dashboard-pro-react.scss?v=1.0.0'
import 'assets/demo/demo.css'
import 'react-notification-alert/dist/animate.css'
import './globalcss.css'

export const GlobalContext = createContext()

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalContext.Provider value={{ state: state, dispatch: dispatch }}>
      <ApolloProvider client={client}>

        <Router>
          <BlockScreen>
            <Switch>
              <Route path='/auth' render={props => <AuthLayout {...props} />} />
              <Route path='/admin' render={props => <AdminLayout {...props} />} />
              <Redirect from='/' to='/admin/dashboard' />
            </Switch>
          </BlockScreen>
        </Router>
      </ApolloProvider>
    </GlobalContext.Provider>
  )
}

export default Main
