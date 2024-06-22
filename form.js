// Add event listeners for the submit button and the home link
document.getElementById("submitForm").addEventListener("click", submitForm);
document.getElementById("homeLink").addEventListener("click", homeLink);

// Function to handle form submission for adding a new contact
function submitForm(e) {
  e.preventDefault();
  const form = new FormData(document.querySelector("#editForm"));
  form.append("apiKey", apiKey);

  // Send a POST request to the server to insert a new contact
  fetch(rootPath + "controller/insert-contact/", {
    method: "POST",
    headers: { Accept: "application/json, *.*" },
    body: form,
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      if (data === "1") {
        alert("Contact Added!");
        homeLink();
      } else {
        alert(data);
        homeLink();
      }
    });
}

// Function to navigate to the home page
function homeLink() {
  window.open("index.html", "_self");
}
