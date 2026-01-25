//src\utils\storage.js
import secureLocalStorage from "react-secure-storage";

export const setToken = (token) => {
  secureLocalStorage.setItem("qr_token", token);
};

export const getToken = () => {
  return secureLocalStorage.getItem("qr_token");
};

export const removeToken = () => {
  secureLocalStorage.removeItem("qr_token");
  secureLocalStorage.removeItem("qr_user");
  secureLocalStorage.removeItem("qr_logged_in");
};

export const isLoggedIn = () => {
  return !!secureLocalStorage.getItem("qr_token");
};

export const getUser = () => {
  return secureLocalStorage.getItem("qr_user");
};