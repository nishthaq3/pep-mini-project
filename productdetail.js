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

// Fetch product
fetch(`https://dummyjson.com/products/${id}`)
  .then(res => res.json())
  .then(product => {

    title.textContent = product.title;
    image.src = product.thumbnail;
    price.textContent = "Price: ₹ " + product.price;
    description.textContent = product.description;
    category.textContent = "Category: " + product.category;

  })
  .catch(err => console.log(err));
