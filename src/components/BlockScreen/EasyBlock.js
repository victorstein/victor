import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../index'
import { SET_BLOCK_SCREEN } from '../../store/actions'

const EasyBlock = props => {
  const { state, dispatch } = useContext(GlobalContext)
  useEffect(() => {
    if(props.isBlock !== state.blockScreen.active) {
      dispatch({
        type: SET_BLOCK_SCREEN, payload: { active: props.isBlock, type: 'content' }
      })
    }
  }, [props.isBlock])
  return (
    <div />
  )
}

export default EasyBlock
