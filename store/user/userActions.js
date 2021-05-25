import * as errorActions from '../errors/errorActions';
import Env from '../../Env';

export const SET_USER_LOCATION = 'SET_USER_LOCATION';
export const SIGNUP = 'SIGNUP';

export const signup = (email, password) => {
  return async dispatch => {
    console.log('signup', email, password);
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Env.GOOGLE_SIGNUP_KEY}`,
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
