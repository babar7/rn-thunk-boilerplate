import { GENERAL_POST, UPDATE_POST } from "../Types";
import _ from "lodash";

const initialState = {
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERAL_POST.SUCCESS: {
      return {
        ...state,
        data: { ...state.data, ...action.data },
      };
    }

    // case UPDATE_LIKE_POST: {
    //     const { id, is_like, like_count } = action.data;
    //     const tempData = _.cloneDeep(state.data[id]);
    //     tempData.is_like = is_like;
    //     tempData.like_count = like_count;
    //     return{
    //         data: { ...state.data, [id]: tempData }
    //     }
    // }

    // case TIMELINE.DELETE_INDEX: {
    //     const tempData = _.omit(state.data, action.data.id);
    //     return{ data: tempData }
    // }

    case UPDATE_POST: {
      return {
        ...state,
        data: { ...state.data, [action.data.id]: action.data },
      };
    }

    // case ADD_POST: {
    //     return{ data: { ...state.data, [action.data.id]: action.data } }
    // }

    default:
      return state;
  }
};
