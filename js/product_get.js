// Listener
// document.getElementById('get_all_data').addEventListener("click", getAllProduct);

Swal.fire({
  title: "Please Wait!",
  html: "It might take a while",
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();
  },
});

// get all product data
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
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
                            <img src="${json[i].image}" class="img-responsive align-self-center p-2" alt="product-image" width = "200" height="200">
                            <div class="card-body">
                              <h6 class="card-title">${title}</h6>
                              <p>Rp. ${convertDollarToRupiah(Math.ceil(json[i].price))}</p>
                              <div class="text-end">
                                <a href="../fake-main-market/detail_product.html?id=${json[i].id}" class="btn btn-outline-success btn-sm">Detail</a>
                                <a href="#" class="btn btn-success btn-sm">Cart</a>
                              </div>
                            </div>
                          </div>
                        </div>`;
    }

    document.getElementById("product-data").innerHTML = x;
    Swal.close();
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

// function addToCart(idProduct) {
//   fetch("https://fakestoreapi.com/carts", {
//     method: "POST",
//     mode: "no-cors",
//     body: JSON.stringify({
//       userId: 1,
//       date: 2020 - 02 - 03,
//       products: [{ productId: idProduct, quantity: 1 }],
//     }),
//   }).then((res) => console.log(res));
// }
