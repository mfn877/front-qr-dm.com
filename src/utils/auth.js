export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("qr_token");
};
