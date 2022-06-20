// Init variable -----------------------------------------------------------
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get("userId");
const checkoutBtn = document.getElementById("btn-checkout");

// Form order --------------------------------------------
const nameRecipient = document.getElementById("recipient_name");
const emailRecipient = document.getElementById("email_recipient");
const selectProvince = document.getElementById("select-option-province");
const selectRegencies = document.getElementById("select-option-regencies");
const selectDistrict = document.getElementById("select-option-district");
const selectVillages = document.getElementById("select-option-village");
const address = document.getElementById("address");
const message = document.getElementById("message");
const messageArea = document.getElementById("message_area");
const btnOrder = document.getElementById("checkout-btn");
btnOrder.disabled = true;
// End Form order ----------------------------------------

let nameRecipientInput;
let emailRecipientInput;
let province;
let regencies;
let district;
let village;
let addressDetail;
let messageDetail;

let totalPrice = 0;
let allProductCheckout = [];

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
    let totalPriceQuantity = convertDollarToRupiah(product.price, productsCart[i].quantity);

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
              <p class="card-text" id="price_product">Rp. ${totalPriceQuantity}</p>
              <p class="card-text" id="description">${product.description}</p>
              <div class="row">
                <div class="col">Quantity : ${productsCart[i].quantity}</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    product["totalQuantityPrice"] = totalPriceQuantity;
    product["quantity"] = productsCart[i].quantity;
    allProductCheckout.push(product);
    console.log(allProductCheckout);
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

// Listener --------------------------------------------
checkoutBtn.addEventListener("click", function () {
  var x = "";

  for (let i = 0; i < allProductCheckout.length; i++) {
    x =
      x +
      `<div class="card mb-3" style="min-height: 150px">
        <div class="row g-0">
          <div class="col-md-4 d-flex justify-content-center p-3">
            <img src="${allProductCheckout[i].image}" id="image_product" class="img-responsive p-3" alt="detail_image" width="100" />
          </div>
          <div class="col">
            <div class="card-body">
              <h6 class="card-title" id="title_product">${allProductCheckout[i].title}</h6>
              <p class="card-text">Quantity : ${allProductCheckout[i].quantity}</p>
              <p class="card-text" id="price_product">Rp. ${allProductCheckout[i].totalQuantityPrice}</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("data-checkout").innerHTML = x;
  document.getElementById("total-payment").innerHTML = "Total Payment : Rp. " + formatRupiah(totalPrice);
});

// Listener --------------------------------------------------------------------
selectProvince.addEventListener("change", function () {
  if (selectProvince.value != "") {
    getRegencies(selectProvince.value);
  }
});

selectRegencies.addEventListener("change", function () {
  if (selectRegencies.value != "") {
    getDistrict(selectRegencies.value);
  }
});

selectDistrict.addEventListener("change", function () {
  if (selectDistrict.value != "") {
    getVillage(selectDistrict.value);
  }
});

selectVillages.addEventListener("change", function () {
  if (selectDistrict.value != "") {
    address.removeAttribute("hidden");
    message.removeAttribute("hidden");
    btnOrder.disabled = false;
  }
});

// Select Province
fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
  .then((response) => response.json())
  .then((provinces) => {
    var x = "";

    for (var i = 0; i < provinces.length; i++) {
      x = x + `<option value="${provinces[i].id}">${provinces[i].name}</option>`;
    }
    selectProvince.innerHTML = x;
  });

// Select Regencies
function getRegencies(id) {
  fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`)
    .then((response) => response.json())
    .then((regencies) => {
      console.log(regencies);

      var x = "";

      for (var i = 0; i < regencies.length; i++) {
        x = x + `<option value="${regencies[i].id}">${regencies[i].name}</option>`;
      }
      selectRegencies.innerHTML = x;
      selectRegencies.removeAttribute("hidden");
    })
    .catch((error) => console.log(error));
}

// Select District
function getDistrict(id) {
  fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`)
    .then((response) => response.json())
    .then((districts) => {
      console.log(districts);

      var x = "";

      for (var i = 0; i < districts.length; i++) {
        x = x + `<option value="${districts[i].id}">${districts[i].name}</option>`;
      }

      selectDistrict.innerHTML = x;
      selectDistrict.removeAttribute("hidden");
    });
}

// Select Village
function getVillage(id) {
  fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`)
    .then((response) => response.json())
    .then((villages) => {
      console.log(villages);

      var x = "";

      for (var i = 0; i < villages.length; i++) {
        x = x + `<option value="${villages[i].id}">${villages[i].name}</option>`;
      }

      selectVillages.innerHTML = x;
      selectVillages.removeAttribute("hidden");
    });
}

btnOrder.addEventListener("click", function () {
  // Recipient
  nameRecipientInput = nameRecipient.value;
  emailRecipientInput = emailRecipient.value;
  addressDetail = address.value;

  if (nameRecipientInput === "" || emailRecipientInput === "" || addressDetail === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Recipient data is not complete!!",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Thanks For Order!",
      text: "Wait for the administrator to contact you!",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "index.html";
      }
    });
  }
});
