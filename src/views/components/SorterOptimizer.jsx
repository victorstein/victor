import React, { useState, useEffect } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, Nav, CardBody, NavItem, NavLink, TabContent, TabPane, Table } from 'reactstrap'
import imageSort from '../../utils/imageSort'
const { shell } = require('electron')

export default function SorterOptimizer (props) {
  const [ images, setImages ] = useState(null)
  const [horizontalTabs, setHorizontalTabs] = useState('slider')

  const fetchInfo = async () => {
    const info = await imageSort(props.files, props.finalPath)
    console.log(info)
    setImages(info)
  }

  useEffect(() => {
    if (props.files !== null) {
      console.log(props.files)
      fetchInfo()
    }
  }, [props.files])

  const changeActiveTab = (e, tadName) => {
    e.preventDefault()
    setHorizontalTabs(tadName)
  }

  const openImage = (path) => {
    shell.openItem(path)
  }

  return (
    <div>
      <Row>
        <Col xs='12'>
          {
            images
              ? <Card>
                <CardHeader>
                  <h5 className='card-category'>Image sorting and optimization</h5>
                  <CardTitle tag='h3'>Preview</CardTitle>
                </CardHeader>
                <CardBody>
                  <Nav className='nav-pills-info' pills>
                    <NavItem>
                      <NavLink
                        data-toggle='tab'
                        href='#pablo'
                        className={
                          horizontalTabs === 'slider'
                            ? 'active'
                            : ''
                        }
                        onClick={e =>
                          changeActiveTab(e, 'slider')
                        }
                      >
                            Slider
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        data-toggle='tab'
                        href='#pablo'
                        className={
                          horizontalTabs === 'general'
                            ? 'active'
                            : ''
                        }
                        onClick={e =>
                          changeActiveTab(e, 'general')
                        }
                      >
                            General
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        data-toggle='tab'
                        href='#pablo'
                        className={
                          horizontalTabs === 'gallery'
                            ? 'active'
                            : ''
                        }
                        onClick={e =>
                          changeActiveTab(e, 'gallery')
                        }
                      >
                            Gallery
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        data-toggle='tab'
                        href='#pablo'
                        className={
                          horizontalTabs === 'callToAction'
                            ? 'active'
                            : ''
                        }
                        onClick={e =>
                          changeActiveTab(e, 'callToAction')
                        }
                      >
                            CTA
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent
                    className='tab-space'
                    activeTab={horizontalTabs}
                  >
                    <TabPane tabId='slider'>
                      <Table responsive>
                        <thead className='text-primary'>
                          <tr>
                            <th>File Name</th>
                            <th>File Path</th>
                            <th>Width x Height</th>
                            <th>Preview</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            images
                              ? images.slider.map((x, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{x.fileName}</td>
                                    <td>{x.filepath}</td>
                                    <td>{x.width} x {x.height}</td>
                                    <td>
                                      <a className='btn-simple btn btn-info' onClick={() => openImage(x.filepath)}>Preview</a>
                                    </td>
                                  </tr>
                                )
                              })
                              : null
                          }
                        </tbody>
                      </Table>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
              : null
          }
        </Col>
      </Row>
    </div>
  )
}
