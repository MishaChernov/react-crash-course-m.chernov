import Types from './Types';

const initialState = {
  theme: 'light',
}

export const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case Types.CHANGE_APP_THEME: {
      return {
        ...state,
        theme: action.payload
      }
    }
    default: return state
  }
}

export const changeTheme = (value) => {

  return {
    type: 'CHANGE_APP_THEME',
    payload: value
  }
}