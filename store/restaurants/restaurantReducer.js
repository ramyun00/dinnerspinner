import {cloneDeep} from 'lodash';
import {GET_RESTAURANTS, SET_RESTAURANTS} from './restaurantActions';

const initialState = {
  restaurants: [],
  nextPageToken: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
        nextPageToken: action.nextPageToken || '',
      };
  }
  return state;
};
