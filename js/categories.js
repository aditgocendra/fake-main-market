// get all category
fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    var x = "",
      i;
    for (i = 0; i < json.length; i++) {
      x = x + `<li><a class="dropdown-item" href="../fake-main-market/product_category.html?category=${json[i]}">${json[i].charAt(0).toUpperCase() + json[i].slice(1)}</a></li>`;
    }
    document.getElementById("categories").innerHTML = x;
  });
