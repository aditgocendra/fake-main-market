const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get("category");

//Product Category
fetch(`https://fakestoreapi.com/products/category/${category}`)
  .then((res) => res.json())
  .then((json) => {
    var x = "",
      i;
    for (i = 0; i < json.length; i++) {
      let title = json[i].title;
      if (title.length > 27) {
        title = title.substring(0, 27);
        title = title + "...";
      }
      x =
        x +
        `<div class="col">
                          <div class="card">
                            <img src="${json[i].image}" class="img-responsive align-self-center" alt="product-image" width = "200" height="200">
                            <div class="card-body">
                              <h6 class="card-title">${title}</h6>
                              <p> $ ${json[i].price}</p>
                              <div class="text-end">
                                <a href="../fake-main-market/detail_product.html?id=${json[i].id}" class="btn btn-outline-success btn-sm">Detail</a>
                                <a href="#" class="btn btn-success btn-sm">Cart</a>
                              </div>
                            </div>
                          </div>
                        </div>`;
    }
    document.getElementById("product-data").innerHTML = x;
  });
