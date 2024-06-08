import localStore from "./localstore.util";
import { get, filter } from "lodash";

export const setUserInfo = async (info) => {
  const _data = { ...info };
  await localStore.store_data("userinfo", _data);
  return true;
};
export const setUserImage = async (info) => {
  // const _data = { ...info };
  await localStore.store_data("image", info);
  return true;
};
export const setUserName = async (info) => {
  // const _data = { ...info };
  await localStore.store_data("name", info);
  return true;
};
export const setStores = async (info) => {
  const _data = { ...info };
  await localStore.store_data("setStores", _data);
  return true;
};

export const setCourseDetails = async (info) => {
  const _data = { ...info };
  await localStore.store_data("setCourseDetails", _data);
  return true;
};

export const setUserAns = async (info) => {
  const _data = { ...info };
  await localStore.store_data("setUserAns", _data);
  return true;
};

export const getUserInfo = () => localStore.get_data("userinfo");

export const removeUserInfo = () => localStore.remove_data("userinfo");

export const setUserRole = async (info) => {
  const _data = { ...info };
  await localStore.store_data("userRole", _data);
  return true;
};
export const getUserRole = () => get(localStore.get_data("userRole"), "role");

export const removeUserRole = () => localStore.remove_data("userRole");

export const getCategories = async () => {
  const _userInfo = await getUserInfo();
  const categories = filter(_userInfo.categories, (item) => item._id);

  return categories;
};
