import React, { useState } from 'react'
import {
  Input,
  Table,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  FormGroup,
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap'
import classnames from 'classnames'
import Select from 'react-select'

const TableDetail = () => {
  const [focusInput, setFocusInput] = useState({
    inputSiteName: {
      focus: false
    },
    inputAccontName: {
      focus: false
    }
  })
  const [singleSelect, setSingleSelect] = useState({
    label: '5',
    value: '5'
  })

  return (
    <div>
      <Row>
        <Col>
          <label htmlFor='FilterBySite'>Filter by Site Name</label>
          <InputGroup
            size='sm'
            className={`text-left ${classnames({ 'input-group-focus': focusInput.inputSiteName.focus })}`}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText><i className='fas fa-search' /></InputGroupText>
            </InputGroupAddon>
            <Input
              id='FilterBySite'
              type='text'
              placeholder='Site Name'
              bsSize='sm'
              onFocus={(e) => setFocusInput({
                ...focusInput,
                inputSiteName: {
                  focus: true
                }
              })}
              onBlur={(e) => setFocusInput({
                ...focusInput,
                inputSiteName: {
                  focus: false
                }
              })}
            />
          </InputGroup>
        </Col>
        <Col>
          <label htmlFor='FilterByAccont'>Filter by Accont Name</label>
          <InputGroup
            size='sm'
            className={`text-left ${classnames({ 'input-group-focus': focusInput.inputAccontName.focus })}`}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText><i className='fas fa-search' /></InputGroupText>
            </InputGroupAddon>
            <Input
              id='FilterByAccont'
              type='text'
              placeholder='Accont Name'
              bsSize='sm'
              onFocus={(e) => setFocusInput({
                ...focusInput,
                inputAccontName: {
                  focus: true
                }
              })}
              onBlur={(e) => setFocusInput({
                ...focusInput,
                inputAccontName: {
                  focus: false
                }
              })}
            />
          </InputGroup>
        </Col>
      </Row>

      <Table>
        <thead className='text-primary'>
          <tr>
            <th scope='col'>Site Name</th>
            <th scope='col'>Account Name</th>
            <th scope='col' className='text-center'>Created At</th>
            <th scope='col' className='text-center'>Created By</th>
            <th scope='col' className='text-center'>Domain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
          </tr>
          <tr>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
          </tr>
          <tr>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
            <td className='text-left'>test</td>
          </tr>
        </tbody>
      </Table>
      <Row className='p-2'>
        <Col className='col-4'>
          <FormGroup>
            <Row>
              <Col className='col-4'>
                <Label for='inputState'>Per Page</Label>
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
        <Col className='col-8'>
          <div className='maxPaginatio'>
            <Pagination>
              <PaginationItem>
                <PaginationLink>
                      Previous
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>
                    1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>
                      Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default TableDetail
