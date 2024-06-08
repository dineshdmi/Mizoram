import localStore from "./localstore.util";
// import { updateHeaders } from "../services";
// import { removeUserInfo } from "./user.util";
// import { upda  teHeaders } from "../services";

export const getToken = () => localStore.get_data("token");

export const getfilter = () => localStore.get_data("token1");

export const setToken = (token) => localStore.store_data("token", token);

export const setRToken = (token) => localStore.store_data("ref_token", token);

export const setfilter = (token1) => localStore.store_filter("token1", token1);

export const removefilter = () => localStore.remove_data("token1");

// export const getCategories = () => localStore.get_data("categories");

// export const setCategories = categories =>
//   localStore.store_data("categories", categories);

export const logout = () => {
  // updateHeaders();
  localStore.remove_data("token");
  return true;
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
  // return Promise.resolve(response);
};
