export function isLoggedIn() {
  return !!localStorage.getItem("auth_token");
}

export function getUserEmail() {
  return localStorage.getItem("auth_email") || "";
}

export function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_email");
}
