export const SET_USER_LOCATION = 'SET_USER_LOCATION';

export const setUserLocation = location => {
  return {
    type: SET_USER_LOCATION,
    location: location,
  };
};
