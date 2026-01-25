// src/lib/auth.js
import api from "@/lib/api";
import { removeToken } from "@/utils/storage";

export async function logoutUser() {
  try {
    await api.post("/logout");
  } catch (e) {
    // even if token expired, proceed with logout
  } finally {
    removeToken();
  }
}
