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

const DetaillData = (props) => {
  const [verticalTabs, setVerticalTabs] = useState({
    tabsActive: 'info'
  })
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
                disabled={props.loading}
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
                disabled={props.loading}
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
                (props.loading) ? (
                  <div style={{ paddingTop: '15%' }} className='d-flex justify-content-center pl-2 pr-2 m-2 '>
                    <BeatLoader
                      color='#4A90E2'
                      size={50}
                      loading
                    />
                  </div>
                ) : (
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
              }
            </TabPane>
            <TabPane tabId='project'>
              <Row>
                <Col className='col-12'>
                  <h5><strong>Table Projects</strong></h5>
                  <TableDetail />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  )
}

export default DetaillData