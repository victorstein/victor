import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
  Button
} from 'reactstrap'

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
              >
                <i className='tim-icons icon-palette' />
                Project
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col md='8'>
          <TabContent activeTab={verticalTabs.tabsActive}>
            <TabPane tabId='info'>
              <Row
                style={{
                  borderBottom: ' 1px solid #453c56c4',
                  paddingBottom: '25px'
                }}
              >
                <Col>
                  <p><strong>First Name</strong></p>
                  <p style={{ color: '#e14eca' }}>test</p>
                </Col>
                <Col>
                  <p><strong>Last Name</strong></p>
                  <p style={{ color: '#e14eca' }}>test</p>
                </Col>
                <Col>
                  <p><strong>Email</strong></p>
                  <p style={{ color: '#e14eca' }}>testtest.net</p>
                </Col>
                <Col>
                  <p><strong>Role</strong></p>
                  <p style={{ color: '#e14eca' }}>User</p>
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId='project'>
          Efficiently unleash cross-media information without
          cross-media value. Quickly maximize timely
          deliverables for real-time schemas. <br />
              <br />
          Dramatically maintain clicks-and-mortar solutions
          without functional solutions.
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  )
}

export default DetaillData
