document.getElementById("register-btn").addEventListener("click", register);

function register() {
  // get data add
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const conf_password = document.getElementById("conf-password").value;

  if (firstname === "" || lastname === "" || email === "" || username === "" || password === "" || conf_password === "") {
    document.getElementById("alert-null-form").removeAttribute("hidden");
  } else if (password != conf_password) {
    document.getElementById("alert-password-form").removeAttribute("hidden");
    document.getElementById("alert-null-form").style.display = "none";
  } else {
    fetch("https://fakestoreapi.com/users", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        name: {
          firstname: firstname,
          lastname: lastname,
        },
        address: {
          city: "bandar lampung",
          street: "7835 new road",
          number: 3,
          zipcode: "12926-3874",
          geolocation: {
            lat: "-37.3159",
            long: "81.1496",
          },
        },
        phone: "1-570-236-7033",
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }
}
