const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

const CREATE = "CREATE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL, CREATE, UPDATE, DELETE].forEach(
    (type) => {
      res[type] = `${base}_${type}`;
    }
  );
  return res;
}
//DEFAULT ACTIONS
export const GENERAL_ACTION = "GENERAL_ACTION";
export const GENERAL_ACTION_MULTIPLE_REQUEST =
  "GENERAL_ACTION_MULTIPLE_REQUEST";
export const NO_INTERNET = "NO_INTERNET";
//SOCKET DEFAULT ACTIONS
export const SOCKET_INFO = createRequestTypes("SOCKET_INFO");
export const SOCKET_DUMP = createRequestTypes("SOCKET_DUMP");
export const SOCKET_WRITE = "SOCKET_WRITE";
//NETWORK DEFAULT ACTION
export const NETWORK_INFO = "NETWORK_INFO";
//LOCATION ACTIONS
export const USER_LOCATION = createRequestTypes("USER_LOCATION");
//APP GENERAL ACTIONS
export const LOGIN = createRequestTypes("LOGIN");
export const SIGNUP = createRequestTypes("SIGNUP");
export const FORGOT_PASSWORD = createRequestTypes("FORGOT_PASSWORD");
export const CHANGE_PASSWORD = createRequestTypes("CHANGE_PASSWORD");
export const DUMP = createRequestTypes("DUMP");
export const LOGOUT = "LOGOUT";
//APP RELATED ACTIONS
//ADD HERE
export const WRITE_REVIEW = createRequestTypes("WRITE_REVIEW");
export const MOVIE_PLATFORM = createRequestTypes("MOVIE_PLATFORM");
export const MOVIE_CATEGORY = createRequestTypes("MOVIE_CATEGORY");
export const PROFILE = createRequestTypes("PROFILE");
export const MOVIES_TITLE = createRequestTypes("MOVIES_TITLE");
// export const FAV_MOVIES = createRequestTypes("FAV_MOVIES");

export const WATCHLIST = createRequestTypes("WATCHLIST");
export const POST_DETAIL = createRequestTypes("POST_DETAIL");
export const COMMENTS = createRequestTypes("COMMENTS");
export const REPLYS = createRequestTypes("REPLYS");

export const FOLLOWERS = createRequestTypes("FOLLOWERS");
export const FOLLOWINGS = createRequestTypes("FOLLOWINGS");

// Custom Reducer Types;
export const SELECTED_PLATFORMS = "SELECTED_PLATFORMS";
export const SELECTED_PLATFORMS_NAME = "SELECTED_PLATFORMS_NAME";
export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
export const SELECTED_TITLE = "SELECTED_TITLE";
export const SELECTED_TITLE_NAME = "SELECTED_TITLE_NAME";
export const SELECTED_GENRE = "SELECTED_GENRE";
export const SELECTED_GENRE_DATA = "SELECTED_GENRE_DATA";

export const NEW_REVIEW = "NEW_REVIEW";

// POST ACTIONS
export const NORMALIZE_POST = createRequestTypes("NORMALIZE_POST");
export const GENERAL_POST = createRequestTypes("GENERAL_POST");
export const UPDATE_LIKE_POST = "UPDATE_LIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const ADD_POST = "ADD_POST";
export const UPLOAD_PROGRESS = "UPLOAD_PROGRESS";

export const POSTS = createRequestTypes("POSTS");
export const MY_POSTS = createRequestTypes("MY_POSTS");
export const EXPLORE_POST = createRequestTypes("EXPLORE_POST");

export const CONTACTS = createRequestTypes("CONTACTS");

export const OTHER_USER = createRequestTypes("OTHER_USER");
export const OTHER_USER_POST = createRequestTypes("OTHER_USER_POST");
