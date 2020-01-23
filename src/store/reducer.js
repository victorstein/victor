import * as actionName from './actions'
import initialState from './initialState'

const reducer = (state, action) => {
    switch (action.type) {
      case actionName.SET_USER: return {
        ...initialState,
        user: action.payload
      }
      default : return {...initialState}
    }
}

export default reducer