import { useEffect } from "react";
import Swal from "sweetalert2";
import { getToken } from "./storage";
//need to redirect to the page that user was on after login/signup
/**
 * Opens an authentication modal (login or signup) in an iframe
 * @param {string} type - "login" or "signup"
 */
export const openAuthModal = (type = "login", pageRoute="/qr-generator") => {
  Swal.fire({
    title: type === "login" ? "Login Required" : "Create Account",
    html: `
      <div style="height:420px;">
        <iframe
          src="/${type}?redirect=${encodeURIComponent(pageRoute)}"
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
export const callLoginModal = (pageRoute = "/qr-generator") => {
  const redirectTo = pageRoute || "/qr-generator";
  if (typeof window !== "undefined") {
    window.location.replace(`/login?redirect=${encodeURIComponent(redirectTo)}`);
    return;
  }
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
  // console.log("useLoginSuccessListener initialized");
  useEffect(() => {
    const listener = (e) => {
      // console.log("Message received in useLoginSuccessListener:", e.data);
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
