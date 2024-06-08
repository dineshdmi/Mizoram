import { ApiGet, ApiPostNoAuth } from "app/helpers/API/ApiData";
import axios from "axios";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
} from "../constants/actionType";

export const registerUser = (data) => {
  console.log("registerUser", data);
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("mongdb error", error);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const loginUser = (data) => {
  console.log("loginUser", data);
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      //   localStorage.setItem('userAuthData', JSON.stringify(data));
    } catch (error) {
      // Every error has a response.data where we can grab the error and display to the user
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response.data.message, //The message is a key for our error message in our routes
      });
    }
  };
};

// export const logoutUser = () => {
//   return async dispatch => {
//     localStorage.removeItem('userAuthData');
//     try {
//       dispatch({
//         type: USER_LOGOUT,
//       });
//     } catch (error) {}
//   };
// };

// //Since this is an authenticated request that need a token we have to get the token from store and pass it to our action
// //But lucky to us dispatch takes another argument which represent all our data in our store

export const getUserProfile = (data) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    console.log("userInfo", userInfo);
    try {
      dispatch({
        type: USER_PROFILE_REQUEST,
      });

      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

export const updateUser = (data) => {
  console.log("updateUser", data);
  return async (dispatch, getState) => {
    try {
      // Get the token of the user from store because that's what our endpoint need
      const { userInfo } = getState().userLogin;
      console.log("userInfo", userInfo);
      //Create a config and pass to axios for authentication

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

// export const fetchUsers = () => {
//   return async dispatch => {
//     try {
//       dispatch({
//         type: FETCH_USERS_REQUEST,
//         loading: true,
//       });
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//       const { data } = await axios.get('/api/users', config);
//       dispatch({
//         type: FETCH_USERS_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: FETCH_USERS_FAIL,
//         error: error.response && error.response.data.message,
//       });
//     }
//   };
// };
