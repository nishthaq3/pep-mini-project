// SEARCH HISTORY

const historyList = document.getElementById("historyList");

const history =
  JSON.parse(localStorage.getItem("searchHistory")) || [];

historyList.innerHTML = "";

if (history.length === 0) {

  historyList.innerHTML = "<p>No search history found</p>";

} else {

  history.reverse().forEach(item => {

    const date = new Date(item.time).toLocaleString();

    const div = document.createElement("div");

    div.style.background = "white";
    div.style.padding = "12px";
    div.style.marginBottom = "10px";
    div.style.borderRadius = "6px";
    div.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";

    div.innerHTML = `
      <div style="font-weight:bold">${item.query}</div>
      <div style="font-size:12px;color:gray">${date}</div>
    `;

    historyList.appendChild(div);
  });
}



// CLEAR SEARCH HISTORY
const clearBtn = document.getElementById("clearHistoryBtn");

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("searchHistory");
  location.reload();
});




// VIEWED PRODUCTS HISTORY

const viewBox = document.getElementById("viewHistory");

const viewHistory =
  JSON.parse(localStorage.getItem("viewHistory")) || [];

if (viewHistory.length === 0) {

  viewBox.innerHTML = "<p>No viewed products yet</p>";

} else {

  let html = "";

  viewHistory.forEach(p => {

    html += `
      <div style="
        background:white;
        padding:10px;
        margin-bottom:10px;
        border-radius:6px;
        box-shadow:0 1px 4px rgba(0,0,0,0.1)
      ">
        <img src="${p.thumbnail}" width="80">
        <h4>${p.title}</h4>
        <p>₹ ${p.price}</p>
      </div>
    `;
  });

  viewBox.innerHTML = html;
}
