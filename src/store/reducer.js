import * as actionName from './actions'
import initialState from './initialState'

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionName.SET_USER: return {
        ...state,
        user: action.payload
      }
      case actionName.SET_INITIAL_STATE: return {
        ...initialState
      }
      default : return { ...state }
    }
}

export default reducer
