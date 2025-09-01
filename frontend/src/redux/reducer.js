// src/redux/reducer.js
import {
  TOGGLE_SIDEBAR,
  TOGGLE_SEARCHBAR,
  TOGGLE_MODE,
} from "./actions";

const initialState = {
  isOpen: true,
  isDay: true,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case TOGGLE_SEARCHBAR:
      return {
        ...state,
        isOpen: true,
      };
    case TOGGLE_MODE:
      return {
        ...state,
        isDay: !state.isDay,
      };
    default:
      return state;
  }
};

// const loginReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_STATE:
//       if (action.payload === null) {
//         return {
//           ...state,
//           isLogin: false,
//           userData: {},
//           wishList: [],
//         };
//       } else {
//         // initialState.userData = action.payload||{};
//         return {
//           ...state,
//           isLogin: !!action.payload,
//           userData: action.payload || {},
//           wishList: action.payload.wishList || [],
//         };
//       }
//     default:
//       return state;
//   }
// };

// const userWishlist = (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_WISHLIST:
//       // initialState.userData = action.payload;
//       return {
//         ...state,
//         wishList: action.payload||[],
//       };
//     default:
//       return state;
//   }
// };

export { sidebarReducer };
