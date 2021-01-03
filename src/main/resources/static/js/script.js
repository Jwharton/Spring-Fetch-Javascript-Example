/**
 * Creates a header of type JSON for use in fetch API requests
 * @returns {Headers} Request JSON header
 */
function createJSONHeader (){
    let JSONHeader = new Headers();
    JSONHeader.append("Content-Type", "application/json");
    return JSONHeader;
}

/**
 * Creates a header of type text for use in fetch API requests
 * @returns {Headers} Request text header
 */
function createPlainTextHeader (){
    let JSONHeader = new Headers();
    JSONHeader.append("Content-Type", "plain/text");
    return JSONHeader;
}

/**
 * Creates the body text in JSON format for use in fetch API requests
 * @param eventTarget stores data from the event
 * @returns {string} request body text in JSON format
 */
function createFormDataInJSONFormat(eventTarget) {
    const formData = new FormData(eventTarget);
    const formDataEntries = Object.fromEntries(formData.entries());
    return JSON.stringify(formDataEntries);
}

/**
 * Creates a fetch API request object with no body
 * @param header specified request header
 * @param requestMethod specified request method
 * @returns {{redirect: string, headers, method}} request object with no body
 */
function createNonBodyRequestOptions(header, requestMethod){

    return {
        method: requestMethod,
        headers: header,
        redirect: "follow"
    };
}

/**
 * Creates a fetch API request object with a body
 * @param header specified request header
 * @param data specified request body
 * @param requestMethod specified request method
 * @returns {{redirect: string, headers, method}} request object with a body
 */
function createRequestOptions(header, data, requestMethod){

    const requestOptions = createNonBodyRequestOptions(header, requestMethod);
    requestOptions.body = data;
    return requestOptions;
}

/**
 * Creates a fetch API request
 * @param url specified target API url
 * @param requestOptions specified request object
 */
function createFetchAPIRequestWithJSONResponse(url, requestOptions){
    fetch(basePersonAPIURL, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));
}

/**
 * Creates an instance of an element using a specified tag and class name
 * @param tagName specified html tag
 * @param className specified html class
 * @returns {*} instance of an element
 */
function createElement(tagName, className){
    const element = document.createElement(tagName);
    element.className = className;
    return element;
}

/**
 * Creates an instance of an element using a specified tag and class name.
 * Sets the innerText of newly created element to the specified display text.
 * @param tagName specified html tag
 * @param className specified html class
 * @param text specified text to be displayed on the screen
 * @returns {*} instance of an element
 */
function createElementWithDisplayText(tagName, className, text){
    const element = createElement(tagName,  className);
    element.innerText = text;
    return element;
}

/**
 * Creates a image as a clickable button
 * @param name name of specified image button object
 * @param className specified class attribute for the image button
 * @param imagePath specified path to the image file
 * @returns {HTMLInputElement} image as a clickable button
 */
function createImageButton(name, className, imagePath) {
    const imageButton = document.createElement("input");
    imageButton.type = "image";
    imageButton.src = imagePath;
    imageButton.name = name;
    imageButton.className = className;
    return imageButton;
}

/**
 * Creates an attribute for to be added to an element
 * @param name
 * @param value
 * @returns {Attr}
 */
function createElementAttribute(name, value){
    const attribute = document.createAttribute(name);
    attribute.value = value;
    return attribute;
}


const basePersonAPIURL = "http://localhost:8080/api/v1/person";

const personRegistration = document.getElementById("personCreationForm");

/**
 * Sends person registration information to the Person API after the "Create
 * Person" button is clicked.
 */
personRegistration.addEventListener("submit", async e => {

    e.preventDefault();

    const header = createJSONHeader();
    const body = createFormDataInJSONFormat(e.target);
    const requestOptions = createRequestOptions(header, body, "POST");

    createFetchAPIRequestWithJSONResponse(basePersonAPIURL, requestOptions);

    window.location.reload();
});

/**
 * Dynamically populates a table with person information to display on the
 * screen
 * @param data person information
 */
function displayPersonInfo(data) {

    const personTable = document.getElementById("personTable");

    data.forEach(person => {
        appendPersonInfoToTable(personTable, person.id, person.name)
    });
}

/**
 * Appends a row of person information, including edit and delete buttons to a
 * table that is displayed to the screen
 * @param personTable table displayed on the screen
 * @param id id of person to be added to the table
 * @param name name of person to be added to the table
 */
const appendPersonInfoToTable = (personTable, id, name) => {

    const personTableBodyRow = createElement("tr", "personTableBodyRow");

    const personID = createElementWithDisplayText("td", "id", id);

    const personName = createElementWithDisplayText("td", "name", name);

    const buttonGroup = createElement("td","bttnGroup");
    const deleteButton = createDeleteButton();
    const editButton = createEditButton();
    buttonGroup.append(editButton, deleteButton);

    personTableBodyRow.append(personID, personName, buttonGroup);
    personTable.append(personTableBodyRow);
}

/**
 * Fetch API request to retrieve all stored person information. Calls a method
 * that receives the data that then is displayed in a table on the screen
 */
fetch("http://localhost:8080/api/v1/person")
    .then(response => response.json())
    .then(data => displayPersonInfo(data))
    .catch(err => console.log(err));

/**
 * Creates the bootstrap image button used to display a boostrap modal edit
 * screen. Appends appropriate bootstrap attributes to the image button element
 * to display the modal bootstrap window.
 * @returns {HTMLInputElement} image button with appropriate bootstrap
 * attributes
 */
const createEditButton = () => {

    const editButton = createImageButton("editPerson", "editPersonButton", "images/edit-button.png");

    const bootstrapModalAttr = createElementAttribute("data-bs-toggle", "modal");
    editButton.setAttributeNode(bootstrapModalAttr);

    const bootstrapTargetAttr = createElementAttribute("data-bs-target", "#exampleModal");
    editButton.setAttributeNode(bootstrapTargetAttr);

    editButton.onclick = editPerson;

    return editButton;
}

/**
 * Creates the header that displays in the edit modal window
 * @param rowData person information from the row in which the specific button
 * is located
 */
function createEditModalHeader(rowData) {
    const editModalHeader = document.getElementById("exampleModalLabel");
    editModalHeader.innerText = `Edit ${rowData.getElementsByClassName("name").item(0).innerText}`;
}

/**
 * Provides the functionality to edit the specified person, by creating the
 * header that displays in the edit modal window and handling the submission
 * of the changed information to the Person API
 */
function editPerson() {

    const tableRow = this.parentNode.parentElement;

    createEditModalHeader(tableRow);

    const idToEdit = tableRow.getElementsByClassName("id").item(0).innerText;

    const url = basePersonAPIURL + "/" + idToEdit;

    let personEditForm = document.getElementById("personEditForm");

    submitChangesHandler(personEditForm, url);

}

/**
 * Submits the changed information from the Edit Person modal window to be
 * stored using the Fetch API
 * @param personEditForm edit modal window element
 * @param url specified target API url
 */
function submitChangesHandler(personEditForm, url){
    personEditForm.addEventListener("submit", async e => {

        e.preventDefault();

        const header = createJSONHeader();
        const body = createFormDataInJSONFormat(e.target);
        const requestOptions = createRequestOptions(header, body, "PUT");

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log("error", error));

        window.location.reload();
    });
}

const editModalClose = document.getElementById("editModalCloseBttn");

/**
 * Sets the input field on the edit modal window to empty when the modal window
 * "Close" button is clicked.
 */
editModalClose.addEventListener("click", async e => {
    const editFullNameInput = document.getElementById("editFullName");
    editFullNameInput.value ="";
});

/**
 * Creates the bootstrap image button symbolizing deletion on the display table.
 * When clicked, the specific table row is removed from the backend storage and
 * the window refreshed to show that the record has been removed.
 * @returns {HTMLInputElement} bootstrap image button symbolizing deletion
 */
const createDeleteButton = () => {
    const deleteButton = createImageButton("deletePerson", "deletePersonButton","images/remove.png");
    deleteButton.onclick = deletePerson;
    return deleteButton;
}

/**
 * Provides the functionality to delete the specified person by handling the
 * deletion request for the specified person ID to the Person API
 */
function deletePerson() {

    const tableRow = this.parentNode.parentElement;
    const idToDelete = tableRow.getElementsByClassName("id").item(0).innerText;

    const deletionURL = basePersonAPIURL + "/" + idToDelete;

    const header = createPlainTextHeader();
    const deleteRequestOptions = createNonBodyRequestOptions(header, "DELETE");

    fetch(deletionURL, deleteRequestOptions)
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(err => console.log(err))

    window.location.reload();
}







