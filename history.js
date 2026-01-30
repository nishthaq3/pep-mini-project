const historyList = document.getElementById("historyList");
const clearBtn = document.getElementById("clearBtn");

// Get history from localStorage
const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

if (history.length === 0) {
  historyList.innerHTML = "<li>No search history found</li>";
} else {

  // Latest first
  history.reverse().forEach(item => {

    const li = document.createElement("li");

    // Convert timestamp
    const date = new Date(item.time);
    const time = date.toLocaleString();

    li.textContent = `${item.query} → ${time}`;

    historyList.appendChild(li);
  });
}

// Clear history
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("searchHistory");
  location.reload();
});
