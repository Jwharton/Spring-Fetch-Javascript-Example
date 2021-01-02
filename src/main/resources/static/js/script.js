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

    let buttonGroup = document.createElement("td");
    buttonGroup.className = "bttnGroup";
    const deleteButton = createDeleteButton();
    const editButton = createEditButton();
    buttonGroup.append(editButton, deleteButton);

    personTableBodyRow.append(personID, personName, buttonGroup);
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

const createEditButton = () => {

    const editButton = document.createElement("input");
    editButton.type = "image";
    editButton.src = "images/edit-button.png";
    editButton.name = "editPerson";
    editButton.className = "editPersonButton";

    const bootstrapModalAttr = document.createAttribute("data-bs-toggle");
    bootstrapModalAttr.value = "modal";
    editButton.setAttributeNode(bootstrapModalAttr);

    const bootstrapTargetAttr = document.createAttribute("data-bs-target");
    bootstrapTargetAttr.value = "#exampleModal";
    editButton.setAttributeNode(bootstrapTargetAttr);

    editButton.onclick = editPerson;

    return editButton;
}

function deletePerson() {

    this.parentNode.parentElement.remove();
    const idToDelete = this.parentNode.parentElement.getElementsByClassName("id").item(0).innerText;

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

function createEditModalHeader(rowData) {
    const editModalHeader = document.getElementById("exampleModalLabel");
    editModalHeader.innerText = `Edit ${rowData.getElementsByClassName("name").item(0).innerText}`;
}

function editPerson() {

    createEditModalHeader(this.parentNode.parentElement);

    const idToEdit = this.parentNode.parentElement.getElementsByClassName("id").item(0).innerText;

    const url = "http://localhost:8080/api/v1/person/" + idToEdit;

    let personEditForm = document.getElementById('personEditForm');

    submitHandler(personEditForm, url);

}

function submitHandler(personEditForm, url){
    personEditForm.addEventListener('submit', async e => {

        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let formData = new FormData(e.target);
        let formDataEntries = Object.fromEntries(formData.entries());

        let raw = JSON.stringify(formDataEntries);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload();
    });
}









