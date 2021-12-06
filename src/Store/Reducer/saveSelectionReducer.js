import {
  LOGOUT,
  SELECTED_PLATFORMS,
  SELECTED_TITLE,
  NEW_REVIEW,
  SELECTED_CATEGORY,
  SELECTED_TITLE_NAME,
  SELECTED_PLATFORMS_NAME,
  SELECTED_GENRE,
  SELECTED_GENRE_DATA,
} from "../Types";
import _ from "lodash";
const initialState = {
  data: [],
  selectedPlatforms: [],
  selectedPlatformsName: [],
  selectedTitle: null,
  selectedCategories: [],
  selectedTitleName: "",
  selectedGenreName: "",
  selectedGenreData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_PLATFORMS:
      return {
        ...state,
        selectedPlatforms: action.data,
      };
    case SELECTED_PLATFORMS_NAME:
      return {
        ...state,
        selectedPlatformsName: action.data,
      };
    case SELECTED_TITLE:
      return {
        ...state,
        selectedTitle: action.data,
      };
    case SELECTED_TITLE_NAME:
      return {
        ...state,
        selectedTitleName: action.data,
      };
    case SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategories: action.data,
      };
    case SELECTED_GENRE:
      return {
        ...state,
        selectedGenreName: action.data,
      };
    case SELECTED_GENRE_DATA:
      return {
        ...state,
        selectedGenreData: action.data,
      };
    case LOGOUT:
    case NEW_REVIEW:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
