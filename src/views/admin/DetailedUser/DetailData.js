import React, { useState } from 'react'
import {
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
  Badge
} from 'reactstrap'
import TableDetail from './TableDetail'
import { BeatLoader } from 'react-spinners'
import moment from 'moment'
import Lottie from 'react-lottie'
import animationServerError from '../../../assets/lottie/serverError.json'

const DetaillData = (props) => {
  const [verticalTabs, setVerticalTabs] = useState({
    tabsActive: 'info'
  })

  const contedCard = () => {
    if (!props.loading && props.user) {
      if (props.error) {
        const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: animationServerError,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }
        return (
          <div>
            <div className='d-flex justify-content-center p-2 m-2'>
              <Lottie
                isClickToPauseDisabled
                options={defaultOptions}
                height='60%'
                width='60%'
              />
            </div>
            <p className='text-center'>Server Error</p>
          </div>
        )
      }

      return (
        <div>
          <Row className='RowInfo'>
            <Col className='col-12'>
              <h5><strong>Oficiial Information </strong></h5>
            </Col>
            <Col className='col-4'>
              <p>First Name</p>
              <p style={{ color: '#e14eca' }}>{props.user.userById.firstName}</p>
            </Col>
            <Col className='col-4'>
              <p>Last Name</p>
              <p style={{ color: '#e14eca' }}>{props.user.userById.lastName}</p>
            </Col>
            <Col className='col-4'>
              <p>Email</p>
              <p style={{ color: '#e14eca' }}>{props.user.userById.email}</p>
            </Col>
          </Row>

          <Row className='RowInfo pt-3'>
            <Col className='col-12'>
              <h5><strong>Account Information</strong></h5>
            </Col>
            <Col className='col-4'>
              <p>Profile Created</p>
              <p style={{ color: '#e14eca' }}>{moment(props.user.userById.createdAt).format('MMMM DD YYYY')}</p>
            </Col>
            <Col className='col-4'>
              <p>Last Profile Update</p>
              <p style={{ color: '#e14eca' }}>{moment(props.user.userById.updatedAt).format('MMMM DD YYYY')}</p>
            </Col>
            <Col className='col-4'>
              <p>Verified</p>
              <Badge
                color={(props.user.userById.verified) ? 'success' : 'danger'}
              >
                {(props.user.userById.verified) ? 'true' : 'false'}
              </Badge>
            </Col>
          </Row>

          <Row className='RowInfo pt-3'>
            <Col className='col-12'>
              <h5><strong>Permissions</strong></h5>
            </Col>
            {
              props.user.userById.permissions.map((value) => (
                <Col className='w-100 pr-0 flex-grow-0' key={value.id}>
                  <Badge color='primary'>{value.name}</Badge>
                </Col>
              ))
            }
          </Row>
        </div>
      )
    } else {
      return (
        <div style={{ paddingTop: '20%' }} className='d-flex justify-content-center pl-2 pr-2 m-2 '>
          <BeatLoader
            color='#4A90E2'
            size={50}
            loading
          />
        </div>
      )
    }
  }
  return (
    <div>
      <Row>
        <Col lg='3' md='6'>
          <Nav
            className='nav-pills-info nav-pills-icons flex-column'
            pills
          >
            <NavItem>
              <NavLink
                data-toggle='tab'
                href='#pablo'
                className={verticalTabs.tabsActive === 'info' ? 'active' : ''}
                onClick={e => setVerticalTabs({
                  tabsActive: 'info'
                })}
                disabled={props.loading || props.error}
              >
                <i className='tim-icons icon-badge' />
                    Info.General
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-toggle='tab'
                href='#pablo'
                className={verticalTabs.tabsActive === 'project' ? 'active' : ''}
                onClick={e => setVerticalTabs({
                  tabsActive: 'project'
                })}
                disabled={props.loading || props.error}
              >
                <i className='tim-icons icon-palette' />
                Project
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col md='8' className='contedPanel'>
          <TabContent activeTab={verticalTabs.tabsActive}>
            <TabPane tabId='info'>
              {
                contedCard()
              }
            </TabPane>
            <TabPane tabId='project'>
              {
                (!props.error) ? (
                  <Row>
                    <Col className='col-12'>
                      <h5><strong>Table Projects</strong></h5>
                      <TableDetail />
                    </Col>
                  </Row>
                ) : null
              }
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  )
}

export default DetaillData
