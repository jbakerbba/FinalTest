var cartCount = 0;
var productInfo = {
  Products: [],
  Cart: []
};

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  if (pageID != "" && pageID != "home") {
    $.get(`pages/${pageID}.html`, function (data) {
      console.log("data " + data);
      $("#app").html(data);
      loadCart();
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      console.log("home " + data);
      $("#app").html(data);
      loadCoffee();
    });
  }
}

function loadCart() {
  $(".cart").html("");
  $.each(productInfo.Cart, (idx, cartItem) => {
    let coffee = productInfo.Products[cartItem.itemIdx];
    $(".cart").append(`<div class="cart-item">
      <div class="item-image">
        <img src="../images/${coffee.productImage}" alt="${coffee.productName}" />
      </div>
      <div class="item-details">
        <h3>${coffee.productName}</h3>
        <p>${coffee.productShortDesc}</p>
        <p class="price">${coffee.productPrice}</p>
      </div>
    </div>`);
  });
}

function loadCoffee() {
  $(".home").html("");
  $.get(`data/data.json`, (data) => {
    productInfo.Products = data.Products;
    $.each(productInfo.Products, (idx, coffee) => {
      $(".home").append(`<div class="coffee">
            <div class="coffeeImage">
              <img
                src="../images/${coffee.productImage}"
                alt="Coffee One"
              />
            </div>
            <div class="coffeeDetails">
              <h3>${coffee.productName}</h3>
              <p class="price">${coffee.productPrice}</p>
              <div id="${idx}" class="buyNow">BUY NOW</div>
            </div>
          </div>`);
    });
  })
    .fail(function (error) {
      alert("error ", error);
    })
    .done(function () {
      $(".buyNow").on("click", (e) => {
        console.log("click");
        let productIdx = e.currentTarget.id;
        let obj = {
          itemIdx: productIdx,
        };
        productInfo.Cart.push(obj);
        console.log(productInfo.Cart);
        cartCount = productInfo.Cart.length;
        updateCartCount();
      });
    });
}

function updateCartCount() {
  $(".cartCounter").text(cartCount);
  if (cartCount === 0) {
    $(".cartCounter").css("display", "none");
  } else {
    $(".cartCounter").css("display", "block");
  }
}

function getData() {
  $.get(`data/data.json`, (data) => {});
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
  updateCartCount();
}

$(document).ready(function () {
  initURLListener();
});

