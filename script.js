// Add event listeners for the refresh button and the add contact button
document.getElementById("refresh").addEventListener("click", fetchContacts);
document.getElementById("addContact").addEventListener("click", addContact);

// Function to fetch all contacts from the server
function fetchContacts() {
  fetch(rootPath + "controller/get-contacts/")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayOutput(data);
      console.log(data);
    });
}

// Function to display the fetched contacts in a table
function displayOutput(data) {
  let output = "<table>";
  for (i in data) {
    output += `
              <div class="col" onclick="editContact(${data[i].id})">
              <div class="card contact">
                <img class="card-img-top img-fluid rounded" src="${rootPath}controller/uploads/${data[i].avatar}" />
                <div class="card-body">
                <h5 class="card-title">${data[i].firstname}</h5>
                <h5 class="card-title">${data[i].lastname}</h5>
                <p class="card-text">Contact entry: ${data[i].firstname} ${data[i].lastname} can be contacted at <br />
                 <i>${data[i].mobile}</i> or <i>${data[i].email}</i></p>
                </div> 
                </div> 
              </div>
`;
  }

  output += "</table>";
  document.getElementById("table").innerHTML = output;
}

// Function to navigate to the add contact page
function addContact() {
  window.open("add-contact.html", "_self");
}

// Function to navigate to the edit contact page for a specific contact
function editContact(id) {
  window.open("edit-contact.html?id=" + id, "_self");
}
