import {
  GENERAL_ACTION,
  GENERAL_ACTION_MULTIPLE_REQUEST,
  LOGOUT,
  NO_INTERNET,
} from "../Types";
import {
  isNetworkReachable,
  isConnected,
} from "react-native-reachability-popup";
import HttpServiceManager from "../../HttpServiceManager/HttpServiceManager";

callback = () => {};

Request = {
  url: String, //Service url
  method: String, //Web Service type 'post,get,put,delete....'
  data: Object, //Paramter for request
  actionType: Object,
};
export function request(
  url, //Service url
  method, //Web Service type 'post,get,put,delete....'
  data, //Paramter for request
  actionType = { REQUEST: "REQUEST", SUCCESS: "SUCCESS", FAILURE: "FAILURE" }, //Action Type
  showHud = true, //Show spinner
  successCB = callback,
  failureCB = callback,
  isConcat = false,
  emptyDataOnRequest = false
) {
  if (!isNetworkReachable() && !isConnected()) {
    return {
      type: NO_INTERNET,
    };
  }
  return (dispatch) => {
    dispatch({
      type: actionType.REQUEST,
      emptyDataOnRequest,
    });
    HttpServiceManager.getInstance()
      .request(url, data, method, showHud)
      .then((response) => {
        dispatch({
          type: actionType.SUCCESS,
          data: response.data,
          isConcat,
        });
        successCB && successCB(response.data);
      })
      .catch((error) => {
        dispatch({ type: actionType.FAILURE, data: error });
        failureCB && failureCB(error);
      });
  };
}
export function multipleRequest(
  requestArray: [Request],
  showHud = true,
  successCB = callback,
  failureCB = callback
) {
  if (!isNetworkReachable() && !isConnected()) {
    return {
      type: NO_INTERNET,
    };
  }
  return {
    type: GENERAL_ACTION_MULTIPLE_REQUEST,
    requestArray,
    showHud,
    successCB,
    failureCB,
  };
}

export function generalSaveAction(type: string, data, meta = {}) {
  return {
    type,
    data,
    meta,
  };
}

export function requestAction(types) {
  return {
    type: types.REQUEST,
  };
}
export function success(types, data) {
  return {
    data,
    type: types.SUCCESS,
  };
}

export function failure(types, errorMessage) {
  return {
    errorMessage,
    type: types.FAILURE,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}
