import Env from '../../Env';

export const GET_RECIPES = 'GET_RECIPES';
export const SET_RECIPES = 'SET_RECIPES';

export const getRecipes = () => {
  return async (dispatch, getState) => {
    const userLocation = getState().user.location;
    const edamamResponse = await fetch(
      `https://api.edamam.com/search?q=healthy&mealtype=dinner&from=0&to=30&app_id=${Env.EDAMAM_APP_ID}&app_key=${Env.EDAMAM_APP_KEY}`,
    );
    const result = await edamamResponse.json();
    dispatch({
      type: SET_RECIPES,
      recipes: result.hits,
    });
  };
};

export const setRecipes = recipes => {
  return {
    type: SET_RECIPES,
    recipes: recipes,
  };
};
