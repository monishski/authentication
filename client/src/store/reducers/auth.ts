import * as actionTypes from '../actions/actionTypes'

interface state {
  token: string | null
}

const initialState: state = {
  token: null
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SIGN_OUT:
      return {
        token: action.payload.token
      }
    default:
      break;
  }
}
