import {SET_SIGNUP_ERROR} from './errorActions';

const initialState = {
  user: {
    message: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNUP_ERROR:
      return {
        user: {
          message: action.message,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
