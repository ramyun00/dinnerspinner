import {GET_RESTAURANTS, SET_RESTAURANTS} from './restaurantActions';

const initialState = {
  restaurants: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
      };
    default:
      return state;
  }
};
