import { combineReducers } from "redux";
import serviceReducer from "./serviceReducer";
import saveSelectionReducer from "./saveSelectionReducer";
import generalPosts from "./generalPosts";
import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  WRITE_REVIEW,
  MOVIE_PLATFORM,
  MOVIES_TITLE,
  POSTS,
  WATCHLIST,
  POST_DETAIL,
  COMMENTS,
  MOVIE_CATEGORY,
  MY_POSTS,
  FOLLOWERS,
  FOLLOWINGS,
  EXPLORE_POST,
  CONTACTS,
  REPLYS,
  OTHER_USER,
  OTHER_USER_POST,
} from "../Types";
const appReducer = combineReducers({
  user: serviceReducer(LOGIN),
  //   Create New Reduce Name signup with signup cases;
  otherUser: serviceReducer(OTHER_USER),

  signup: serviceReducer(SIGNUP),
  writeReview: serviceReducer(WRITE_REVIEW),
  moviePlatforms: serviceReducer(MOVIE_PLATFORM),
  movieCategories: serviceReducer(MOVIE_CATEGORY),
  moviesTitle: serviceReducer(MOVIES_TITLE),

  // Type == Posts
  posts: serviceReducer(POSTS),
  myPosts: serviceReducer(MY_POSTS),
  postDetail: serviceReducer(POST_DETAIL),
  explorePosts: serviceReducer(EXPLORE_POST),
  otherUserPosts: serviceReducer(OTHER_USER_POST),

  watchList: serviceReducer(WATCHLIST),
  comments: serviceReducer(COMMENTS),
  commentReply: serviceReducer(REPLYS),

  followers: serviceReducer(FOLLOWERS),
  followings: serviceReducer(FOLLOWINGS),

  contacts: serviceReducer(CONTACTS),

  //   Customize Reducer
  saveSelection: saveSelectionReducer,
  generalPosts: generalPosts,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    let newState = {};
    for (let key of Object.keys(state)) {
      newState[key] = {
        ...state[key],
        data: [],
        meta: { current_page: 0, last_page: 0 },
      };
    }
    state = {
      ...newState,
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
