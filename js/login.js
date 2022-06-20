function login() {
  let username, password;
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

  if (username === "" || password === "") {
    document.getElementById("alert-null-form").removeAttribute("hidden");
  }

  fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      username: "mor_2314",
      password: "83r5^_",
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
}
