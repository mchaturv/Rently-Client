export function authHeader() {
  // return bearer token authorization header
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.authdata) {
    return { Authorization: "Bearer Token: " + user.authdata };
  } else {
    return {};
  }
}
