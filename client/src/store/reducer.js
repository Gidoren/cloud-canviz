import * as actionTypes from "./actions";

const initialState = {
  arts: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ARTS:
      return {
        ...state,
        arts: action.arts
      };
  }
};
export default reducer;
