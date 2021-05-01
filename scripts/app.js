import { Book, myLibary, libarySort, getTotalPagesRead, getTotalBooksRead } from "./libary.js";

const table = document.querySelector("tbody");
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const pagesInput = document.querySelector("#book-pages");
const publishedInput = document.querySelector("#book-published");
const statusInput = document.querySelector("#book-status");

const sortSelect = document.querySelector("#sort-select");
const directionSelect = document.querySelector("#sort-direct-select");

const cleanTable = () => table.textContent = "";

function renderStats() {
    document.querySelector("#books-total").textContent = `Total number of Books: ${myLibary.length}`;
    document.querySelector("#books-total-read").textContent = `Read: ${getTotalBooksRead()}`;
    document.querySelector("#books-total-pages").textContent = `Total number of pages read: ${getTotalPagesRead()}`;
}

function renderBooks() {
    cleanTable();
    myLibary.forEach((book) => {
        const tableRow = document.createElement("tr");
        tableRow.id = myLibary.indexOf(book);
        tableRow.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.numberOfPages}</td>
        <td>${book.published}</td>
        <td><input class="checkbox-status" type="checkbox" ${book.haveRead ? "checked" : "unchecked"}/></td>
        <td><button class="remove-btn">delete</button></td>`;
        table.append(tableRow);
    });
    document.querySelectorAll(".checkbox-status").forEach(checkbox => checkbox.addEventListener("change", statusClicked));
    document.querySelectorAll(".remove-btn").forEach(btn => btn.addEventListener("click", removeClicked));
}

function addBookToLibary() {
    myLibary.push(new Book(
        titleInput.value,
        authorInput.value,
        parseInt(publishedInput.value),
        parseInt(pagesInput.value),
        statusInput.checked
    ));
}

function removeClicked() {
    const tableRow = this.parentElement.parentElement;
    const bookId = parseInt(tableRow.id);
    myLibary.splice(bookId, 1);
    renderBooks();
    renderStats();
}

function statusClicked() {
    const tableRow = this.parentElement.parentElement;
    const bookId = parseInt(tableRow.id);
    myLibary[bookId].haveRead = this.checked;
    renderStats();
}

function resetInput() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    publishedInput.value = "";
    titleInput.placeholder = "Title";
    authorInput.placeholder = "Author";
    pagesInput.placeholder = "Number of pages";
    publishedInput.placeholder = "YYYY";
    statusInput.checked = false;
}

function renderErrorMessage(textField, error) {
    textField.value = "";
    textField.placeholder = error;
}

function isValidInput() {
    let isValid = true
    if (titleInput.value.length <= 0) {
        renderErrorMessage(titleInput, "Please enter a title");
        isValid = false;
    }
    if (authorInput.value.length <= 0) {
        renderErrorMessage(authorInput, "Please enter a name");
        isValid = false;
    }
    if (pagesInput.value.length <= 0 || pagesInput.value <= 0) {
        renderErrorMessage(pagesInput, "Enter a number greater than 0");
        isValid = false;
    }
    if (publishedInput.value.length !== 4) {
        renderErrorMessage(publishedInput, "Enter a year in the format: YYYY");
        return false;
    }
    const currentYear = new Date().getFullYear();
    if (publishedInput.value > currentYear) {
        renderErrorMessage(publishedInput, "Release year can't be set in the future");
        isValid = false;
    }
    return isValid;
}

function addBookClicked() {
    document.querySelector(".modal-window").style["display"] = "block";
}

function closeClicked() {
    resetInput();
    document.querySelector(".modal-window").style["display"] = "none";
}

function submitClicked() {
    if (!isValidInput()) return;
    addBookToLibary();
    resetInput();
    renderBooks();
    renderStats();
}

function sortOptionSelected() {
    const orderAfter = sortSelect.options[sortSelect.selectedIndex].text;
    const direction = directionSelect.options[directionSelect.selectedIndex].text;
    libarySort[orderAfter](direction === "asc" ? true : false);
    renderBooks();
}

function initSortSelectionElements() {
    Object.keys(libarySort).forEach((key) => {
        const option = document.createElement("option");
        option.text = key;
        sortSelect.add(option);
    });
    sortSelect.addEventListener("change", sortOptionSelected);
    directionSelect.addEventListener("change", sortOptionSelected);
}

initSortSelectionElements();
document.querySelector(".add-book-btn").addEventListener("click", addBookClicked);
document.querySelector(".close-btn").addEventListener("click", closeClicked);
document.querySelector("#book-submit-btn").addEventListener("click", submitClicked);
resetInput();
renderBooks();
renderStats();