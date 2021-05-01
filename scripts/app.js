import { Book, myLibary } from "./libary.js";

const table = document.querySelector("tbody");
const titleField = document.querySelector("#book-title");
const authorField = document.querySelector("#book-author");
const pagesField = document.querySelector("#book-pages");
const publishedField = document.querySelector("#book-published");
const statusField = document.querySelector("#book-status");

const cleanTable = () => table.textContent = "";

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
    const title = titleField.value;
    const author = authorField.value;
    const pages = pagesField.value.length > 0 ? parseInt(pagesField.value) : "";
    const published = publishedField.value.length > 0 ? parseInt(publishedField.value) : "";
    const status = statusField.checked;
    myLibary.push(new Book(
        title,
        author,
        published,
        pages,
        status
    ));
}

function removeClicked() {
    const tableRow = this.parentElement.parentElement;
    const bookId = parseInt(tableRow.id);
    myLibary.splice(bookId, 1);
    renderBooks();
}

function statusClicked() {
    const tableRow = this.parentElement.parentElement;
    const bookId = parseInt(tableRow.id);
    myLibary[bookId].haveRead = this.checked;
}

function resetInput() {
    titleField.value = "";
    authorField.value = "";
    pagesField.value = "";
    publishedField.value = "";
    titleField.placeholder = "Title";
    authorField.placeholder = "Author";
    pagesField.placeholder = "Number of pages";
    publishedField.placeholder = "YYYY";
    statusField.checked = false;
}

function renderErrorMessage(textField, error) {
    textField.value = "";
    textField.placeholder = error;
}

function isValidTitle() {
    if (titleField.value.length <= 0) {
        renderErrorMessage(titleField, "Please enter a title");
        return false;
    }
    return true;
}

function isValidPageNumber() {
    const pages = pagesField.value;
    const pageNumber = parseInt(pages);
    if (pages.length > 0 && (Number.isNaN(pageNumber) || pageNumber <= 0)) {
        renderErrorMessage(pagesField, "Enter a number greater than 0");
        return false;
    }
    return true;
}

function isValidReleaseyear() {
    if (publishedField.value.length > 0) {
        if (publishedField.value.length !== 4) {
            renderErrorMessage(publishedField, "Enter a year in the format: YYYY");
            return false;
        }
        const year = parseInt(parseInt(publishedField.value));
        if (Number.isNaN(year)) {
            renderErrorMessage(publishedField, "Only numbers are allowed for release year");
            return false;
        }
        const currentYear = new Date().getFullYear();
        if (year > currentYear) {
            renderErrorMessage(publishedField, "Release year can't be set in the future");
            return false;
        }
    }
    return true;
}

function isValidInput() {
    return isValidTitle() && isValidPageNumber() && isValidReleaseyear();
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
}

document.querySelector(".add-book-btn").addEventListener("click", addBookClicked);
document.querySelector(".close-btn").addEventListener("click", closeClicked);
document.querySelector("#book-submit-btn").addEventListener("click", submitClicked);
resetInput();
renderBooks();