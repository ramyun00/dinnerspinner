import Env from '../../Env';

export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const SET_RESTAURANTS = 'SET_RESTAURANTS';

export const getRestaurants = () => {
  return async (dispatch, getState) => {
    const userLocation = getState().user.location;
    const nextPageToken = getState().restaurants.nextPageToken;
    const googlePlacesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        userLocation.latitude
      },${
        userLocation.longitude
      }&radius=3000&type=restaurant&keyword=food&opennow=true&pagetoken=${
        nextPageToken || ''
      }&key=${Env.GOOGLE_MAPS_KEY}`,
    );
    const result = await googlePlacesResponse.json();

    dispatch({
      type: SET_RESTAURANTS,
      restaurants: result.results,
      nextPageToken: result.next_page_token,
    });
  };
};

export const setRestaurants = restaurants => {
  return {
    type: SET_RESTAURANTS,
    restaurants: restaurants,
  };
};
