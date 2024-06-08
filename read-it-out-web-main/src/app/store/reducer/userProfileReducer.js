import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAIL,
} from "../constants/actionType";

const userProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    // Profile
    case USER_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        user: payload,
      };
    case USER_PROFILE_FAIL:
      return {
        loading: false,
        payload: payload,
      };
    default:
      return state;
  }
};

export default userProfileReducer;
