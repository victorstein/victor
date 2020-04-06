import React, { useContext } from 'react'
import logout from '../../utils/Auth/logout'
import { GlobalContext } from '../../index'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavLink,
  Row,
  Col
} from 'reactstrap'

import './styles.css'

const UserDropDown = props => {
  const { state } = useContext(GlobalContext)

  const loginOff = () => {
    logout(props.history)
  }

  let userName = ''
  let email = ''
  if (state.user) {
    userName = state.user.firstName
    email = state.user.email
  }
  return (
    <Row className='d-flex align-items-center dropdown nav-item d-flex align-items-center justify-content-center'>
      <Col xs='8' md='6' className='p-0 d-flex justify-content-end'><p className='m-0'>{userName}</p></Col>
      <Col xs='4' md='6' className='p-0'>
        <UncontrolledDropdown nav className='userDropDown p-0 ml-1'>
          <DropdownToggle
            color='default'
            data-toggle='dropdown'
            nav
            className='p-0 d-flex justify-content-center ml-auto'
            onClick={e => e.preventDefault()}
          >
            <div className='photo p-0'>
              {
                <Avatar
                  className='avatar'
                  name={`${state.user.fullName}`}
                  size='30' email={email} round
                />
              }
            </div>
          </DropdownToggle>
          <DropdownMenu className='dropdown-navbar' right tag='ul'>
            <NavLink tag='li'>
              <Link
                to='/admin/profile'
              >
                <DropdownItem className='nav-item'>
                Profile
                </DropdownItem>
              </Link>
            </NavLink>
            {
              // <NavLink tag='li'>
              //   <DropdownItem className='nav-item'>
              //   Settings
              //   </DropdownItem>
              // </NavLink>
            }
            <DropdownItem divider tag='li' />
            <NavLink tag='li'>
              <DropdownItem className='nav-item' onClick={() => loginOff()}>
                Log out
              </DropdownItem>
            </NavLink>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>
    </Row>
  )
}

export default UserDropDown
