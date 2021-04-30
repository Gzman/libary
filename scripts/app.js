import { Book, myLibary } from "./libary.js";

const table = document.querySelector("tbody");

function displayBooks() {
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

function removeClicked() {
    const tableRow = this.parentElement.parentElement;
    const bookId = parseInt(tableRow.id);
    myLibary.splice(bookId, 1);
    table.textContent = "";
    displayBooks();
}

function statusClicked(event) {
    const checkbox = event.target;
    const tr = checkbox.parentElement.parentElement;
    const bookId = parseInt(tr.id);
    myLibary[bookId].haveRead = checkbox.checked;
}

displayBooks();