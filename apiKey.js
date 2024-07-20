// Set the root path for the API
let rootPath = "https://mysite.itvarsity.org/api/ContactBook/";
// Add event listener for the submit API key button
document.getElementById("submitApiKey").addEventListener("click", setApiKey);

// Function to handle the API key submission
function setApiKey(e) {
  e.preventDefault();

  // Get the entered API key
  apiKey = document.getElementById("apiKey").value;
  // Send a request to validate the API key
  fetch(rootPath + "controller/api-key/?apiKey=" + apiKey)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      if (data == "1") {
        localStorage.setItem("apiKey", apiKey);
        window.open("index.html", "_self");
      } else {
        alert(data + "Invalid Api key entered!");
      }
    });
}
