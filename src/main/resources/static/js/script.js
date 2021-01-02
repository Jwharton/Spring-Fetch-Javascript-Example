let personRegistration = document.getElementById('personCreationForm');

personRegistration.addEventListener('submit', async e => {

    e.preventDefault();

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let formData = new FormData(e.target);
    let formDataEntries = Object.fromEntries(formData.entries());

    let raw = JSON.stringify(formDataEntries);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/api/v1/person", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    window.location.reload();
});


function showPerson(data) {
    const personTable = document.getElementById("personTable");
    let tableHeaders = ["ID", "Full Name"];

    data.forEach(person => {
        appendPersons(personTable, person.id, person.name)
    });
}

const appendPersons = (personTable, id, name) => {
    let personTableBodyRow = document.createElement("tr");
    personTableBodyRow.className = "personTableBodyRow";

    let personID = document.createElement("td");
    personID.className = "id";
    personID.innerText = id;

    let personName = document.createElement("td");
    personName.className = "name"
    personName.innerText = name;

    const deleteButton = createDeleteButton();

    personTableBodyRow.append(personID, personName, deleteButton);
    personTable.append(personTableBodyRow);
}


fetch("http://localhost:8080/api/v1/person")
    .then(response => response.json())
    .then(data => showPerson(data))
    .catch(err => console.log(err));


const createDeleteButton = () => {
    const deleteButton = document.createElement("input");
    deleteButton.type = "image";
    deleteButton.src = "images/remove.png";
    deleteButton.name = "deletePerson";
    deleteButton.className = "deletePersonButton";
    deleteButton.onclick = deletePerson;

    return deleteButton;
}

function deletePerson() {

    this.parentNode.remove();
    const idToDelete = this.parentNode.getElementsByClassName("id").item(0).innerText;

    const url = "http://localhost:8080/api/v1/person/" + idToDelete;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "plain/text");

    const deleteRequestOptions = {

        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'

    }

    fetch(url, deleteRequestOptions)
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}





