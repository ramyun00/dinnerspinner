import * as errorActions from '../errors/errorActions';

export const SET_USER_LOCATION = 'SET_USER_LOCATION';
export const SIGNUP = 'SIGNUP';

export const signup = (email, password) => {
  return async dispatch => {
    console.log('signup', email, password);
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwNGHgJNGAgGDchziE0BKF-7sq0XDiYzU',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    ).catch(error => {
      throw new Error('Yikes', error);
    });

    const resData = await response.json();
    if (!response.ok) {
      dispatch(errorActions.setError(resData.error.message));
    }

    console.log('user sign up response', resData);
    dispatch({
      type: SIGNUP,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};

export const userLogin = action => {};

export const setUserLocation = location => {
  return {
    type: SET_USER_LOCATION,
    location: location,
  };
};
