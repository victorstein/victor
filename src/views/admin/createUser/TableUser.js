import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
  Pagination, PaginationItem, PaginationLink, CardFooter
} from 'reactstrap'
import classnames from 'classnames'
import Select from 'react-select'

const TableUser = (props) => {
  const [focusInput, setFocusInput] = useState({
    inputName: {
      focus: false
    }
  })
  const [singleSelect, setSingleSelect] = useState({
    label: '5',
    value: '5'
  })
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>User list</CardTitle>
          <Button
            onClick={(e) => props.setOpenModal(true)}
            className='btn-simple'
            color='success'
          >
            <i className='fas fa-plus-circle mr-2' />
                Add User
          </Button>
        </CardHeader>
        <CardBody>
          <Table responsive className='table'>
            <thead className='text-primary'>
              <tr>
                <th scope='col' style={{ maxWidth: '275px', width: '275px' }}>
                  <Row>
                    <Col style={{ paddingTop: '0.6rem' }} className='text-center col-4'>
                        Name
                    </Col>
                    <Col className='col-8'>
                      <InputGroup
                        size='sm'
                        className={`text-left ${classnames({ 'input-group-focus': focusInput.inputName.focus })}`}
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
                <th scope='col'>Email</th>
                <th scope='col' className='text-center'>Role</th>
                <th scope='col' className='text-center'>verified</th>
                <th scope='col' className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='text-left'>Miguel Espinales</td>
                <td>mee@topfloormarketing.net</td>
                <td className='text-center'>Admin</td>
                <td className='text-center'>
                  <Badge color='success'>true</Badge>
                </td>
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
                    <Select
                      className='react-select primary'
                      classNamePrefix='react-select'
                      name='singleSelect'
                      value={singleSelect}
                      onChange={(value) => {
                        setSingleSelect(value)
                      }}
                      options={[
                        {
                          value: '',
                          label: 'Perpage',
                          isDisabled: true
                        },
                        { value: '5', label: '5' },
                        { value: '10', label: '10' },
                        { value: '15', label: '15' }
                      ]}
                      placeholder='Perpage'
                    />
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

export default TableUser
