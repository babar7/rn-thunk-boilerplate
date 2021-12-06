import { GENERAL_POST, NO_INTERNET } from "../Types";
import {
  isNetworkReachable,
  isConnected,
} from "react-native-reachability-popup";
import HttpServiceManager from "../../HttpServiceManager/HttpServiceManager";
import { normalize, schema } from "normalizr";
import _ from "lodash";

export function getPostRequest(
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
        let normalizedData = postDataNormalizer(response.data);
        dispatch({
          type: GENERAL_POST.SUCCESS,
          data:
            _.isUndefined(normalizedData.entities.posts) &&
            _.isEmpty(normalizedData.entities)
              ? {}
              : normalizedData.entities.posts,
        });
        successCB && successCB(response.data);
        return normalizedData;
      })
      .then((normalizedData) => {
        global.log("normalizedData", normalizedData);
        dispatch({
          type: actionType.SUCCESS,
          data: normalizedData.result,
          isConcat,
          emptyDataOnRequest,
        });
      })
      .catch((error) => {
        dispatch({ type: actionType.FAILURE, data: error });
        failureCB && failureCB(error);
      });
  };
}

function postDataNormalizer(data) {
  const postSchema = new schema.Entity("posts");
  const postList = [postSchema];
  const normalizedData = normalize(data, postList);
  return normalizedData;
}
