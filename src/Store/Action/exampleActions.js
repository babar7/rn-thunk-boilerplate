import ActionTypes from "../../Store/Types";

export const example = (params) => {
  return (dispatch) => {
    dispatch({
      type: "Type",
      payload: params,
    });
  };
};
