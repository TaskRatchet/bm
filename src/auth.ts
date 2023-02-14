const params = new URLSearchParams(location.search);
const usernameParam = params.get("username");
const accessTokenParam = params.get("access_token");
const usernameLocal = localStorage.getItem("username");
const accessTokenLocal = localStorage.getItem("access_token");
const lastLoginRaw = localStorage.getItem("last_login");

if (usernameParam && accessTokenParam) {
  localStorage.setItem("username", usernameParam);
  localStorage.setItem("access_token", accessTokenParam);
  localStorage.setItem("last_login", new Date().getTime().toString());
}

export const USERNAME = usernameParam || usernameLocal || "";
export const ACCESS_TOKEN = accessTokenParam || accessTokenLocal || "";
export const LAST_LOGIN = lastLoginRaw ? parseInt(lastLoginRaw) : undefined;

export function logOut() {
  localStorage.removeItem("username");
  localStorage.removeItem("access_token");
  localStorage.removeItem("last_login");
  window.location.href = "/";
}
