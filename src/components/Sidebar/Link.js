import React, { useContext } from 'react'
import { GlobalContext } from '../../index'
// reactstrap components
import { Nav, Collapse } from "reactstrap"
import { NavLink } from "react-router-dom"

const Link = (props) => {

  const { state: stateContext } = useContext(GlobalContext)

  const { user } = stateContext
  const { valueRoute, index, state, getCollapseInitialState, activeRoute, setState } = props

  if (valueRoute.layout !== '/admin' || !valueRoute.visible) {
    return null
  }

  const userRol = user.role.name
  const routerRol = valueRoute.role
  if(routerRol.indexOf(userRol) < 0 && routerRol.length > 0){
    return null
  }

  if (valueRoute.redirect) {
    return null
  }
  if (valueRoute.collapse) {
    var st = {}
    st[valueRoute['state']] = !state[valueRoute.state]
    return (
      <li
        className={getCollapseInitialState(valueRoute.views) ? 'active' : ''}
        key={index}
      >
        <a
          href='#pablo'
          data-toggle='collapse'
          aria-expanded={state[valueRoute.state]}
          onClick={e => {
            e.preventDefault()
            setState(st)
          }}
        >
          <React.Fragment>
            <span className='sidebar-mini-icon'>{valueRoute.mini}</span>
            <span className='sidebar-normal'>
              {valueRoute.name}
              <b className='caret' />
            </span>
          </React.Fragment>
        </a>
        <Collapse isOpen={state[valueRoute.state]}>
          <ul className='nav'>{this.createLinks(valueRoute.views)}</ul>
        </Collapse>
      </li>
    )
  }
  return (
    <li
      className={activeRoute(valueRoute.layout + valueRoute.path)}
      key={index}
    >
      <NavLink
        to={valueRoute.layout + valueRoute.path}
        activeClassName=''
        onClick={() => props.closeSidebar}
      >
        {valueRoute.icon !== undefined ? (
          <>
            <i className={valueRoute.icon} />
            <p>{valueRoute.name}</p>
          </>
        ) : (
          <>
            <span className='sidebar-mini-icon'>{valueRoute.mini}</span>
            <span className='sidebar-normal'>{valueRoute.name}</span>
          </>
        )}
      </NavLink>
    </li>
  )
}

export default Link
