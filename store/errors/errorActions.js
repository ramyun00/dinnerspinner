export const SET_SIGNUP_ERROR = 'SET_SIGNUP_ERROR';
export const RESET_ERROR = 'RESET_ERRORS';

export const setError = error => {
  console.log('error dispatched', error);
  return {
    type: SET_SIGNUP_ERROR,
    message: error,
  };
};
