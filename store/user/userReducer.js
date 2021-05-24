import {SET_USER_LOCATION, SIGNUP} from './userActions';

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    default:
      return state;
  }
};
