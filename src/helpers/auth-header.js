// Author - Anshdeep Singh (an450723@dal.ca)

export function authHeader() {
  // return bearer token authorization header
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.authdata) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
