const params = new URLSearchParams(location.search);
const usernameParam = params.get("username");
const accessTokenParam = params.get("access_token");
const usernameLocal = localStorage.getItem("username");
const accessTokenLocal = localStorage.getItem("access_token");

if (usernameParam && usernameParam !== usernameLocal) {
  localStorage.setItem("username", usernameParam);
}

if (accessTokenParam && accessTokenParam !== accessTokenLocal) {
  localStorage.setItem("access_token", accessTokenParam);
}

export const USERNAME = usernameParam || usernameLocal || "";
export const ACCESS_TOKEN = accessTokenParam || accessTokenLocal || "";

export function logOut() {
  localStorage.removeItem("username");
  localStorage.removeItem("access_token");
  window.location.href = "/";
}