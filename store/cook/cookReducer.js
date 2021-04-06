import {GET_RECIPES, SET_RECIPES} from './cookActions';

const initialState = {
  recipes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.recipes,
      };
  }
  return state;
};
