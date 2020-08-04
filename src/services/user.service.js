// Author - Anshdeep Singh (an450723@dal.ca)

export const userService = {
  login,
  register,
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(
    `http://localhost:3100/api/users/authenticate`,
    //`https://rently-services-group13.herokuapp.com/api/users/authenticate`,
    requestOptions
  )
    .then(handleResponse)
    .then((user) => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and token in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(user.token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function register(name, email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  };

  return fetch(
    `https://rently-services-group13.herokuapp.com/api/users/add-user`,
    requestOptions
  )
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = data && data.message;
      return Promise.reject(error);
    }

    return data;
  });
}
