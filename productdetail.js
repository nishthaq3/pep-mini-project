// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("No product selected");
}


// Get elements
const title = document.getElementById("title");
const image = document.getElementById("image");
const price = document.getElementById("price");
const description = document.getElementById("description");
const category = document.getElementById("category");
const rating = document.getElementById("rating");
const stock = document.getElementById("stock");
const discount = document.getElementById("discount");
const SKU = document.getElementById("SKU");
const weight = document.getElementById("weight");
const warranty = document.getElementById("warranty");
const shipping = document.getElementById("shipping");


// Fetch product
fetch(`https://dummyjson.com/products/${id}`)
  .then(res => res.json())
  .then(product => {

    title.textContent = product.title;
    image.src = product.thumbnail;

    price.textContent = "Price: ₹ " + product.price;

    description.textContent = "Description: " + product.description;

    category.textContent = "Category: " + product.category;

    rating.textContent = "Rating: " + product.rating;

    stock.textContent = "Stock: " + product.stock;

    discount.textContent =
      "Discount: " + product.discountPercentage + "%";

    SKU.textContent = "SKU: " + product.sku;

    weight.textContent = "Weight: " + (product.weight || "N/A");

    warranty.textContent =
      "Warranty: " + (product.warrantyInformation || "N/A");

    shipping.textContent =
      "Shipping: " + (product.shippingInformation || "N/A");


  
    saveViewedProduct(product);

  })
  .catch(err => console.log(err));




// SAVE VIEWED PRODUCT
function saveViewedProduct(product) {

  let history =
    JSON.parse(localStorage.getItem("viewHistory")) || [];

  // remove duplicate
  history = history.filter(p => p.id !== product.id);

  // add latest
  history.unshift(product);

  // keep last 10
  history = history.slice(0, 10);

  localStorage.setItem("viewHistory", JSON.stringify(history));
}
