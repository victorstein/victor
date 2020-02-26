import React, { useState } from 'react'
import { Button, Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText } from 'reactstrap'

const FiltersSections = ({ setFilter, submitFilter, loading, getMoreSections }) => {
    const [focused, setFocused] = useState('')

    const onFocus = () => {
      setFocused('input-group-focus')
    }
    const onBlur = () => {
      setFocused('')
    }
    const onChange = (e) => {
      if(!loading) {
        setFilter([{
          field: 'NAME',
          value: e.target.value
        }])
      }  
    }
    const keyPressed = (event) => {
      if (event.key === 'Enter' && !loading) {
        submitFilter()
        setFocused('input-group-focus')
      }
    }
    return (
      <div className='d-flex justify-content-between'>
      <Button onClick={()=> getMoreSections()} disabled={loading} color='link' className='m-0 p-0 text-success'><i className='tim-icons icon-simple-add' /> Load more sections</Button>
      <InputGroup className={focused + ' w-50'}>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <i className='tim-icons icon-zoom-split' />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type='text'
            placeholder='Filter Sections'
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyPress={(e)=>keyPressed(e)}
            onChange={(e) => onChange(e)}
            className={focused}
          />
        </InputGroup>
    </div>
    )
}

export default FiltersSections

