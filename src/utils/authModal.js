import { useEffect } from "react";
import Swal from "sweetalert2";
import { getToken } from "./storage";

/**
 * Opens an authentication modal (login or signup) in an iframe
 * @param {string} type - "login" or "signup"
 */
export const openAuthModal = (type = "login") => {
  Swal.fire({
    title: type === "login" ? "Login Required" : "Create Account",
    html: `
      <div style="height:420px;">
        <iframe
          src="/${type}"
          style="width:100%;height:100%;border:none;border-radius:6px;"
        ></iframe>
      </div>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    width: 520,
  });
};

/**
 * Displays a login/register prompt modal with options to login or signup
 */
export const callLoginModal = () => {
  Swal.fire({
    icon: "warning",
    title: "Login Required",
    text: "Please login or register to save QR codes.",
    showDenyButton: true,
    confirmButtonText: "Login",
    denyButtonText: "Register",
  }).then((result) => {
    if (result.isConfirmed) openAuthModal("login");
    if (result.isDenied) openAuthModal("signup");
  });
};

/**
 * Custom hook to listen for LOGIN_SUCCESS message from iframe
 * Automatically updates API authorization header and closes modal on successful login
 * @param {Object} api - The API instance to update authorization header
 */
export const useLoginSuccessListener = (api) => {
  useEffect(() => {
    const listener = (e) => {
      if (e.origin !== window.location.origin) return;

      if (e.data === "LOGIN_SUCCESS") {
        const token = getToken();
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
        }
        Swal.close();
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [api]);
};
