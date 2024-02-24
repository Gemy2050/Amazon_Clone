export const initialState = {
  basket: [],
  user: null,
};

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "ADD_TO_BASKET":
      return { ...state, basket: [...state.basket, action.item] };
    case "REMOVE_FROM_BASKET": {
      let itemIndex = state.basket.findIndex((el) => el.id === action.id);
      let newBasket = [...state.basket];
      if (itemIndex >= 0) {
        newBasket.splice(itemIndex, 1);
      }
      return {
        ...state,
        basket: newBasket,
      };
    }
    case "EMPTY_BASKET":
      return { ...state, basket: [] };
    default:
      return state;
  }
}

export default AppReducer;
