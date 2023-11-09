// Global variables
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("save-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-all-btn");
const tabBtn = document.getElementById("tab-btn");
let savedItems = [];

// Load savedItems (Rendering) using localStorage
const savedItemsOnLocalStorage = JSON.parse(localStorage.getItem("savedItems"));
if (savedItemsOnLocalStorage) {
  savedItems = savedItemsOnLocalStorage;
  renderItems(savedItems);
}

// Save the Lead & Render Saved items
function saveItem() {
  if (inputEl.value !== "") {
    const lead = inputEl.value.trim();
    savedItems.push(lead);
    // Clear the input field
    inputEl.value = "";
    // Save the savedItems (array) to localStorage
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }
  //Items saved then to be rendered.
  renderItems(savedItems);
  // console.log(localStorage.getItem("savedItems"));
}

function renderItems(itemsArray) {
  let listItems = "";
  // Render the leads in the unordered list
  listItems = itemsArray
    .map((item) => {
      return `<li>
            <a href="${item}" target="_blank">${item}</a>
            <button class="delete-btn" data-item="${item}">Delete</button>
          </li>`;
    })
    .join("\n");

  // console.log(listItems);
  // Save the updated list to localStorage

  // Update the DOM with the latest list item - Render with performance optimization
  ulEl.innerHTML = listItems;
}

// Add an event listener to the save button
saveBtn.addEventListener("click", saveItem);

// Render the saved items on page load - Use below instead of ulEl.innerHTML = listItems;
// renderItems(); Why the below is better <https://g.co/bard/share/caf139f2f756>
window.addEventListener("load", renderItems);

// Delete the savedItems on localstorage & empty the array as well!!
deleteBtn.addEventListener("dblclick", clearLocalStorage);

function clearLocalStorage() {
  localStorage.clear();
  savedItems = [];
  renderItems(savedItems);
}

// Save a Tab - Grab the URL:
tabBtn.addEventListener("click", saveCurrentTabUrl);

function saveCurrentTabUrl() {
  // Grab the URL of the current tab using chrome API
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // since only one tab should be active and in the current window at once
    const currentUrl = tabs[0].url;
    savedItems.push(currentUrl);
    // Save to localStorage as well!
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
    renderItems(savedItems);
  });
}
