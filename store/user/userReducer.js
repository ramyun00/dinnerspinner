import {SET_USER_LOCATION} from './userActions';

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    default:
      return state;
  }
};
