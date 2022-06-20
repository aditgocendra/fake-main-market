// Init variable -----------------------------------------------------------
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

let nameRecipientInput;
let emailRecipientInput;
let province;
let regencies;
let district;
let village;
let addressDetail;
let messageDetail;

// End init variable---------------------------------------------------------

// Get Element---------------------------------------------------------------

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
const btnOrder = document.getElementById("btnOrder");
btnOrder.disabled = true;
// End Form order ----------------------------------------

const titleProduct = document.getElementById("title_product");
const priceProduct = document.getElementById("price_product");
const description = document.getElementById("description");
const productImage = document.getElementById("image_product");

// Modal --------------------------------------------
const nameProductModal = document.getElementById("name_product_modal");
const productImageModal = document.getElementById("image_product_modal");
const priceProductModal = document.getElementById("price_product_modal");
const recipientModal = document.getElementById("recipient_modal");
const emailModal = document.getElementById("email_modal");
const provinceModal = document.getElementById("province_modal");
const regenciesModal = document.getElementById("regencies_modal");
const districtModal = document.getElementById("district_modal");
const villageModal = document.getElementById("village_modal");
const addressModal = document.getElementById("address_modal");
const messageModal = document.getElementById("message_modal");
const btnCheckout = document.getElementById("checkout_btn");
// End Modal ----------------------------------------

// End Get Element------------------------------------------------------------

// Select spesific data
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    titleProduct.innerText = json.title;
    priceProduct.innerText = "Rp. " + convertDollarToRupiah(json.price);
    description.innerText = json.description;
    productImage.src = json.image;
  })
  .catch((error) => {
    console.log(error);
  });

// Convert Dollar to Rupiah
function convertDollarToRupiah(totalDollar) {
  const OneDollarToRupiah = 14838;

  return formatRupiah(Math.ceil(totalDollar * OneDollarToRupiah));
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

btnOrder.addEventListener("click", function () {
  // Product Order
  nameProductModal.innerHTML = titleProduct.innerHTML;
  productImageModal.src = productImage.src;
  priceProductModal.innerHTML = priceProduct.innerHTML;

  // Recipient
  nameRecipientInput = nameRecipient.value;
  emailRecipientInput = emailRecipient.value;
  province = selectProvince.options[selectProvince.selectedIndex].text;
  regencies = selectRegencies.options[selectRegencies.selectedIndex].text;
  district = selectDistrict.options[selectDistrict.selectedIndex].text;
  village = selectVillages.options[selectVillages.selectedIndex].text;
  addressDetail = address.value;
  messageDetail = messageArea.value;

  recipientModal.innerHTML = nameRecipientInput;
  emailModal.innerHTML = emailRecipientInput;
  provinceModal.innerHTML = province;
  regenciesModal.innerHTML = regencies;
  districtModal.innerHTML = district;
  villageModal.innerHTML = village;
  addressModal.innerHTML = addressDetail;
  messageModal.innerHTML = messageDetail;
});

btnCheckout.addEventListener("click", function () {
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

// End Listener -----------------------------------------------------------------

// NOT WORKING
// fetch(`https://api.rajaongkir.com/starter/province?key=dc017349dee4025bb735efdb423817d0`, {
//   method: "GET",
//   mode: "no-cors",
// })
//   .then((res) => console.log(res))
//   .catch((error) => {
//     console.log(error);
//   });
