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
    });
}

// Function to display the fetched contacts in a table
function displayOutput(data) {
  let output = "<table>";
  for (i in data) {
    output += `
              <tr onclick="editContact(${data[i].id})">
                <td><img src="${rootPath}controller/uploads/${data[i].avatar}" width="40"/></td>
                  <td><h5>${data[i].firstname}</h5></td>
                  <td><h5>${data[i].lastname}</h5></td>
              </tr>
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
