alert("JS is connected");

const container = document.getElementById("product-container");

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    showProducts(data.products);
  })
  .catch(err => console.log(err));

function showProducts(products) {
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}">
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
    `;

    container.appendChild(card);
  });
}
