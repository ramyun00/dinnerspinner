export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const SET_RESTAURANTS = 'SET_RESTAURANTS';

export const getRestaurants = () => {
  return async (dispatch, getState) => {
    // Make call to google places here
    dispatch({type: SET_RESTAURANTS, restaurants: []});
  };
};
