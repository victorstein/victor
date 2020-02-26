import React, { useState } from 'react'
import {
  Input,
  Table,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
  Pagination, PaginationItem, PaginationLink, CardFooter
} from 'reactstrap'
import classnames from 'classnames'

const TableDetail = () => {
  const [focusInput, setFocusInput] = useState({
    inputName: {
      focus: false
    }
  })

  return (
    <div style={{ overflow: 'auto', width: '660px' }}>
      <Table>
        <thead className='text-primary'>
          <tr>
            <th scope='col' style={{ maxWidth: '275px', width: '275px' }}>
              <Row>
                <Col style={{ paddingTop: '0.6rem' }} className='text-center col-4'>
                    Site Name
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
        </tbody>
        {
          // contendTable()
        }
      </Table>
    </div>
  )
}

export default TableDetail
