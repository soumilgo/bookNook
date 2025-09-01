// src/redux/actions.js
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const TOGGLE_SEARCHBAR = 'TOGGLE_SEARCHBAR';
export const TOGGLE_MODE = 'TOGGLE_MODE';
export const LOGIN_STATE = 'LOGIN_STATE';
export const UPDATE_WISHLIST = 'UPDATE_WISHLIST';

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const toggleSearchbar = () => ({
  type: TOGGLE_SEARCHBAR,
});

export const toggleMode = () => ({
  type: TOGGLE_MODE,
});
