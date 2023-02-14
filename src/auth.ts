const params = new URLSearchParams(location.search);
const usernameParam = params.get("username");
const accessTokenParam = params.get("access_token");
const usernameLocal = localStorage.getItem("username");
const accessTokenLocal = localStorage.getItem("access_token");
const lastLoginRaw = localStorage.getItem("last_login");
const clientId = import.meta.env.VITE_BM_CLIENT_ID;
const redirectUri = import.meta.env.VITE_BM_REDIRECT_URI;

if (usernameParam && accessTokenParam) {
  localStorage.setItem("username", usernameParam);
  localStorage.setItem("access_token", accessTokenParam);
  localStorage.setItem("last_login", new Date().getTime().toString());
}

export const USERNAME = usernameParam || usernameLocal || "";
export const ACCESS_TOKEN = accessTokenParam || accessTokenLocal || "";
export const LAST_LOGIN = lastLoginRaw ? parseInt(lastLoginRaw) : undefined;
export const AUTH_URL = `https://www.beeminder.com/apps/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;

export function logOut() {
  localStorage.removeItem("username");
  localStorage.removeItem("access_token");
  localStorage.removeItem("last_login");
  window.location.href = "/";
}
