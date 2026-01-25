import api from "./api";

export const loginUser = async (payload) => {
  const res = await api.post("/login", payload);
  return res.data;
};
export const signupUser = async (payload) => {
  const response = await api.post("/register", payload);
  return response.data;
};