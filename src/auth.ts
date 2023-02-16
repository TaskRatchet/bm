export const USERNAME = localStorage.getItem("username") || "";
export const API_KEY = localStorage.getItem("api_key") || "";

export function login(username: string, apiKey: string) {
  localStorage.setItem("username", username);
  localStorage.setItem("api_key", apiKey);
  window.location.href = "/";
}

export function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("api_key");
  window.location.href = "/";
}
