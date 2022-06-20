fetch("https://fakestoreapi.com/users/1")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    let username = json.username;
    document.getElementById("usernameLinkDropDown").innerHTML = username.charAt(0).toUpperCase() + username.slice(1);
    document.getElementById("cartUser").href = `../fake-main-market/cart.html?userId=${json.id}`;
  });
