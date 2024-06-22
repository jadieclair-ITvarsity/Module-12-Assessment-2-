// Add event listeners for various buttons and links on the page
document.getElementById("homeLink").addEventListener("click", homeLink);
document.getElementById("editContact").addEventListener("click", editContact);
document.getElementById("submitForm").addEventListener("click", submitForm);
document
  .getElementById("deleteContact")
  .addEventListener("click", deleteContact);

// Retrieve the contact ID from the URL
const id = getId();

// Function to extract ID from the URL
function getId() {
  const url = window.location.href;
  const pos = url.search("=");
  const id = url.slice(pos + 1);
  return id;
}

// Function to fetch contact details from the server
function getContact() {
  fetch(rootPath + "controller/get-contacts/?id=" + id)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayOutput(data);
    });
}

// Function to navigate to the home page
function homeLink() {
  window.open("index.html", "_self");
}

// Function to display contact details on the page
function displayOutput(data) {
  let avatarImg = `
  <img src="${rootPath}/controller/uploads/${data[0].avatar}" width="200" />
  `;
  document.getElementById("avatarImage").innerHTML = avatarImg;
  document.getElementById("firstname").value = data[0].firstname;
  document.getElementById("lastname").value = data[0].lastname;
  document.getElementById("mobile").value = data[0].mobile;
  document.getElementById("email").value = data[0].email;
}

// Function to enable form fields for editing
function editContact() {
  document.getElementById("firstname").readOnly = false;
  document.getElementById("lastname").readOnly = false;
  document.getElementById("mobile").readOnly = false;
  document.getElementById("email").readOnly = false;
  document.getElementById("avatar").hidden = false;
  document.getElementById("submitForm").hidden = false;
}

// Function to handle form submission for editing contact details
function submitForm(e) {
  e.preventDefault();
  const form = new FormData(document.querySelector("#editForm"));
  form.append("apiKey", apiKey);
  form.append("id", id);

  fetch(rootPath + "controller/edit-contact/", {
    method: "POST",
    headers: { Accept: "application/json, *.*" },
    body: form,
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      if (data === "1") {
        alert("Contact Edited!");
        homeLink();
      } else {
        alert(data);
        homeLink();
      }
    });
}

// Function to handle contact deletion
function deleteContact() {
  const confirmDelete = confirm("Delete contact. Are you sure?");

  if (confirmDelete) {
    fetch(rootPath + "controller/delete-contact/?id=" + id)
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        if (data === "1") {
          homeLink();
        } else {
          alert(data);
        }
      });
  }
}
