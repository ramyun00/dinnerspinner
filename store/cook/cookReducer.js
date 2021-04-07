import {GET_RECIPES, SET_RECIPES} from './cookActions';

const initialState = {
  recipes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPES:
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      shuffleArray(action.recipes);
      return {
        ...state,
        recipes: action.recipes,
      };
  }
  return state;
};
