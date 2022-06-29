let myLibrary = []

let mainDiv = document.getElementById("books-container")
let mainContainer = document.querySelector(".container")
let form = document.querySelector('.form')
let formDiv = document.getElementById("form-container")
let deleteButton = document.getElementById("deleteButton")


function Book(title, author, pages, read, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = id
}

Book.prototype.changeStatus = function(event) {
    let eventTargetClass = event.target.classList
    if (this.read === true) {
        this.read = false
        eventTargetClass.replace("change-status-on", "change-status-off")
        event.target.textContent = "Not read"
    } else {
        this.read = true
        eventTargetClass.replace("change-status-off", "change-status-on")
        event.target.textContent = "Read"
    }
}

Book.prototype.addToDiv = function() {
    let childDiv = document.createElement("div");
    childDiv.classList.add("book-card")

    let titleParagraph = document.createElement("h1");
    let authorParagraph = document.createElement("p");
    let pagesParagraph = document.createElement("p");

    let buttonContainer = document.createElement("div")
    buttonContainer.id = "change-status"
    buttonContainer.classList.add("change-status")
    

    let deleteButton = document.createElement("button")
    deleteButton.id = "deleteButton"
    deleteButton.innerHTML = "Delete"

    let statusButton = document.createElement("button")
    statusButton.id = "changeStatus"
    if (this.read) {
        statusButton.classList.add("change-status-on")
        statusButton.innerHTML = "Read"
    } else {
        statusButton.classList.add("change-status-off")
        statusButton.innerHTML = "Not read"
    }

    buttonContainer.append(statusButton, deleteButton)

    // Needed to add id to button
    let id = myLibrary.length - 1
    deleteButton.setAttribute("data-id", id)

    titleParagraph.textContent = `${this.title}`
    authorParagraph.textContent = `By: ${this.author}`
    pagesParagraph.textContent = `Pages: ${this.pages}`

    childDiv.append(titleParagraph, authorParagraph, pagesParagraph, buttonContainer)
    mainDiv.append(childDiv)

    deleteButton.addEventListener('click', deleteItem)
    statusButton.addEventListener("click", this.changeStatus.bind(this))
}

/// At the moment, it deletes the wrong id
function deleteItem(e) {
    let idToDelete = e.target.getAttribute('data-id');
    myLibrary.splice(idToDelete, 1)

    e.target.parentNode.parentNode.remove()
}

function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus) {
    userBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus)
    myLibrary.push(userBook)

    console.log(myLibrary);
    displayBook(userBook)

}

//Needed function to display book on html when adding new div
function displayBook(book) {
    book.addToDiv()
}

const addBookButton = document.getElementById("addBookButton")
addBookButton.addEventListener("click", function() {
    formDiv.className = "form-container-visible"
})

const hidePopup = document.querySelector("blocker")
function hide() {
    formDiv.className = "form-container-hidden"
}


const submitButton = document.getElementById("submit-button")

submitButton.addEventListener("click", function(e) {
    e.preventDefault()
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value
    let read = document.getElementById("read").checked    

    if (read) {

    }

    form.reset();
    formDiv.className = "form-container-hidden"
    addBookToLibrary(title, author, pages, read)

})

console.log(myLibrary);