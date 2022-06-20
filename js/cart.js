// Init variable -----------------------------------------------------------
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get("userId");
let totalPrice = 0;

Swal.fire({
  title: "Please Wait!",
  html: "It might take a while",
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();
  },
});

getCartUser();

function getCartUser() {
  fetch(`https://fakestoreapi.com/carts/user/${userId}`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json[0].products);
      var productsCart = json[0].products;

      setCardUserCart(productsCart);
    });
}

async function setCardUserCart(productsCart) {
  var x = "";
  for (let i = 0; i < productsCart.length; i++) {
    var product = await getDataProduct(productsCart[i].productId);
    console.log(x);
    x =
      x +
      `<div class="card mb-3" style="min-height: 300px">
        <div class="row g-0">
          <div class="col-md-4 d-flex justify-content-center p-3">
            <img src="${product.image}" id="image_product" class="img-responsive p-3" alt="detail_image" width="160" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title" id="title_product">${product.title}</h5>
              <p class="card-text" id="price_product">Rp. ${convertDollarToRupiah(product.price, productsCart[i].quantity)}</p>
              <p class="card-text" id="description">${product.description}</p>
              <div class="row">
                <div class="col">Quantity : ${productsCart[i].quantity}</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("cart-data").innerHTML = x;
  document.getElementById("total-price").innerHTML = "Rp. " + formatRupiah(totalPrice);
  Swal.close();
}

function getDataProduct(idProduct) {
  var result = fetch(`https://fakestoreapi.com/products/${idProduct}`)
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
  return result;
}

fetch(`https://fakestoreapi.com/users/${userId}`)
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    let username = json.username;
    document.getElementById("usernameLinkDropDown").innerHTML = username.charAt(0).toUpperCase() + username.slice(1);
  });

// Convert Dollar to Rupiah
function convertDollarToRupiah(totalDollar, quantity) {
  const OneDollarToRupiah = 14838;
  priceProduct = Math.ceil(totalDollar * OneDollarToRupiah) * quantity;
  totalPrice += priceProduct;
  return formatRupiah(priceProduct);
}

// Rupiah Format
function formatRupiah(bilangan) {
  var number_string = bilangan.toString(),
    sisa = number_string.length % 3,
    rupiah = number_string.substr(0, sisa),
    ribuan = number_string.substr(sisa).match(/\d{3}/g);

  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  return rupiah;
}
