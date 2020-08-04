// Author - Anshdeep Singh (an450723@dal.ca)

export const appointmentService = {
  makeAppointment,
};

function makeAppointment(propertyId, userId, timeSlot) {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.authdata) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({ propertyId, userId, timeSlot }),
    };
    return fetch(
      `${process.env.REACT_APP_API_URL}/appointments/add-appointment`,
      requestOptions
    )
      .then(handleResponse)
      .then(() => {});
  }
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
