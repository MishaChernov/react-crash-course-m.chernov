import Types from './Types';

export const changeTheme = (value) => ({
  type: 'CHANGE_APP_THEME',
  payload: {
    theme: value
  }
})

export const appReducer = (state, action) => {
  switch(action.type) {
    case Types.GET_APP_THEME: {
      return {
        ...state,
        theme: action.payload 
      }
    }
    case Types.CHANGE_APP_THEME: {
      return {
        ...state,
        theme: action.payload.theme
      }
    }
    default: return state
  }
}

export const state = {
  theme: 'light',
}
