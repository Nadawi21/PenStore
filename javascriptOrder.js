function loadProductPage() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => render(products));
}

function render(products) {
  let output = '<div class="row">';

  products.forEach((product) => {
    output += `
<div class="col-12 col-md-6 col-lg-3 mb-4">
<div class="card" style="width: 18rem;">
  <img src="${product.image}" class="card-img-top" alt="${product.title}">
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <a href="order.html?id=${product.id}" class="btn btn-secondary">Köp ${(
      product.price * 10
    ).toFixed(2)}kr</a>
  </div>
</div>
</div>
`;
    let productInfo = [
      product.image,
      product.title,
      product.description,
      product.price,
    ];
    localStorage.setItem(product.id, JSON.stringify(productInfo));
  });

  output += "</div>";

  document.getElementById("Products").innerHTML = output;
}

//Hämtar valda produktens id
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  localStorage.setItem("orderId", id);
  console.log(id);

  //Hämtar produktinformation från Local Storage
  const product = JSON.parse(localStorage.getItem(id));
  console.log(product);

  //Lägger till card till formulärsidan
  document.getElementById("itemToOrder").innerHTML = `<div class="row g-0">
        <div class="col-md-4">
            <img src="${
              product[0]
            }" id="image-order" class="img-fluid rounded-start" alt="${
    product[1]
  }">
        </div>
        <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${product[1]}</h5>
            <p class="card-text">${product[2]}</p>
            <p class="card-text"><small class="text-body-secondary">${(
              product[3] * 10
            ).toFixed(2)}kr</small></p>
            </div>
        </div>
    </div>
    `;
}
function validateForm(e) {
  e.preventDefault();
  let validater = true;

  let name = document.forms["customerForm"]["customerName"].value;
  let mail = document.forms["customerForm"]["e-mail"].value;
  let phone = document.forms["customerForm"]["phoneNumber"].value;
  let street = document.forms["customerForm"]["street"].value;
  let zipcode = document.forms["customerForm"]["zipCode"].value;
  let city = document.forms["customerForm"]["city"].value;

  document.getElementById("nameLable").innerHTML = "För- och Efternamn:";
  if (name.length < 2 || name.length > 50) {
    document.getElementById(
      "nameLable"
    ).innerHTML += `<div style="color:Tomato">Minst 2 tecken, max 50</div>`;
    validater = false;
  }

  document.getElementById("mailLable").innerHTML = "E-post:";
  if (!mail.includes("@") || mail.length > 50) {
    document.getElementById(
      "mailLable"
    ).innerHTML += `<div style="color:Tomato">En e-post måste innehålla '@'</div>`;
    validater = false;
  }

  document.getElementById("phoneLable").innerHTML = "Telefonnummer:";
  if (/[^\d()-]/.test(phone) || phone == "") {
    document.getElementById(
      "phoneLable"
    ).innerHTML += `<div style="color:Tomato">Endast siffror, bindestreck och parenteser</div>`;
    validater = false;
  }

  document.getElementById("streetLable").innerHTML = "Gatuadress:";
  if (street.length < 2 || street.length > 50) {
    document.getElementById(
      "streetLable"
    ).innerHTML += `<div style="color:Tomato">Minst 2 tecken, max 50</div>`;
    validater = false;
  }

  document.getElementById("zipLable").innerHTML = "Postnummer:";
  if (zipcode.length != 5 || /[^\d]/.test(zipcode)) {
    document.getElementById(
      "zipLable"
    ).innerHTML += `<div style="color:Tomato">Exakt 5 siffror</div>`;
    validater = false;
  }

  document.getElementById("cityLable").innerHTML = "Ort:";
  if (city.length < 2 || city.length > 50) {
    document.getElementById(
      "cityLable"
    ).innerHTML += `<div style="color:Tomato">Minst 2 tecken, max 50</div>`;
    validater = false;
  }

  if (validater) {
    console.log(localStorage.getItem("orderId"));
    alert("Order Successful");
    window.location = "orderComplete.html";
  }
  //return validater;
}

function loadCompleteOrder() {
  console.log(localStorage.getItem("orderId"));

  let orderId = localStorage.getItem("orderId");
  const product = JSON.parse(localStorage.getItem(orderId));

  document.getElementById("completeOrder").innerHTML = `<div class="row g-0">
          <div class="col-md-4">
              <img src="${
                product[0]
              }" id="image-order" class="img-fluid rounded-start" alt="${
    product[1]
  }">
          </div>
          <div class="col-md-8">
          <div class="card-body">
              <h5 class="card-title">${product[1]}</h5>
              <p class="card-text">${product[2]}</p>
              <p class="card-text"><small class="text-body-secondary">${(
                product[3] * 10
              ).toFixed(2)}kr</small></p>
              </div>
          </div>
      </div>
      `;
  //localStorage.removeItem("orderId");
}
