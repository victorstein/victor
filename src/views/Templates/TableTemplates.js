import React, { useState } from 'react'
import {
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Progress,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Pagination, PaginationItem, PaginationLink, CardFooter
} from 'reactstrap'
import classnames from 'classnames'

const TableTemplates = () => {
  const [focusInput, setFocusInput] = useState({
    inputName: {
      focus: false
    }
  })

  return (
    <div>
      <Card>
        <CardHeader>
          <div className='tools float-right'>
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                className='btn-link btn-icon'
                color='default'
                data-toggle='dropdown'
                type='button'
              >
                <i className='tim-icons icon-settings-gear-63' />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  href='#pablo'
                  // onClick={e => e.preventDefault()}
                >
              Action
                </DropdownItem>
                <DropdownItem
                  href='#pablo'
                  // onClick={e => e.preventDefault()}
                >
              Another action
                </DropdownItem>
                <DropdownItem
                  href='#pablo'
                  // onClick={e => e.preventDefault()}
                >
              Something else here
                </DropdownItem>
                <DropdownItem
                  className='text-danger'
                  href='#pablo'
                  // onClick={e => e.preventDefault()}
                >
              Remove Data
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <CardTitle tag='h4'>Templates list</CardTitle>
        </CardHeader>
        <CardBody>
          <Table>
            <thead className='text-primary'>
              <tr>
                <th>
                  <Row>
                    <Col className='col-2 mt-2'>
                         Name
                    </Col>
                    <Col className='col-9'>
                      <InputGroup
                        size='sm'
                        className={`text-right ${classnames({
                          'input-group-focus': focusInput.inputName.focus
                        })}`}
                      >
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText><i className='fas fa-search' /></InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type='text'
                          placeholder='Filter by Name'
                          bsSize='sm'
                          onFocus={(e) => setFocusInput({
                            ...focusInput,
                            inputName: {
                              focus: true
                            }
                          })}
                          onBlur={(e) => setFocusInput({
                            ...focusInput,
                            inputName: {
                              focus: false
                            }
                          })}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </th>
                <th>Description</th>
                <th className='text-center'>Teme</th>
                <th className='text-right'>Layouts</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='text-left'>Andrew Mike</td>
                <td>Develop</td>
                <td className='text-center'>2013</td>
                <td className='text-right'>€ 99,225</td>
                <td className='text-center'>
                  <Button
                    className='btn-link btn-icon'
                    color='primary'
                    id='ViewButton'
                  >
                    <i className='fas fa-eye' />
                  </Button>
                  <UncontrolledTooltip
                    delay={0}
                    target='ViewButton'
                  >
                  View
                  </UncontrolledTooltip>
                  <Button
                    className='btn-link btn-icon'
                    color='warning'
                    id='tooltip324367706'
                  >
                    <i className='fas fa-edit' />
                  </Button>
                  <UncontrolledTooltip
                    delay={0}
                    target='tooltip324367706'
                  >
                    Edit
                  </UncontrolledTooltip>
                  <Button
                    className='btn-link btn-icon'
                    color='danger'
                    id='tooltip974171201'
                    size='sm'
                  >
                    <i className='tim-icons icon-simple-remove' />
                  </Button>
                  <UncontrolledTooltip
                    delay={0}
                    target='tooltip974171201'
                  >
                    Delete
                  </UncontrolledTooltip>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <Row>
            <Col>
              <FormGroup>
                <Row>
                  <Col className='col-2'>
                    <Label for='inputState'>Page</Label>
                  </Col>
                  <Col>
                    <Input className='tableTemplates' type='select' name='select' id='inputState'>
                      <option style={{ color: 'black' }}>5</option>
                      <option style={{ color: 'black' }}>10</option>
                      <option style={{ color: 'black' }}>15</option>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col>
              <Pagination listClassName='justify-content-end'>
                <PaginationItem
                  disabled={false}
                >
                  <PaginationLink href='#'>
                     Previous
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#'>
                      1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href='#'>
                     2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#'>
                     3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#'>
                        Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>

        </CardFooter>
      </Card>
    </div>
  )
}

export default TableTemplates
