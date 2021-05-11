import { Book, Libary } from "./libary.js";


const DisplayCtrl = ((Libary) => {
    const table = document.querySelector("tbody");

    const cleanTable = () => table.textContent = "";

    const renderLibaryStats = () => {
        document.querySelector("#books-total").textContent = `Books: ${Libary.myBooks().length}`;
        document.querySelector("#books-total-read").textContent = `Read: ${Libary.getTotalBooksRead()}`;
        document.querySelector("#books-total-pages").textContent = `Total page count: ${Libary.getTotalPagesRead()}`;
    }

    const renderBooks = () => {
        cleanTable();
        Libary.myBooks().forEach((book, bookId) => {
            const tableRow = document.createElement("tr");
            tableRow.id = bookId;
            tableRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.numberOfPages}</td>
            <td>${book.published}</td>
            <td><input class="checkbox-status" type="checkbox" ${book.haveRead ? "checked" : "unchecked"}/></td>
            <td><button class="remove-btn">delete</button></td>`;
            table.append(tableRow);
        });
        document.querySelectorAll(".checkbox-status").forEach(checkbox => checkbox.addEventListener("change", readStatusClicked));
        document.querySelectorAll(".remove-btn").forEach(btn => btn.addEventListener("click", removeClicked));
    }

    function removeClicked() {
        const tableRow = this.parentElement.parentElement;
        const bookId = parseInt(tableRow.id);
        Libary.removeBook(bookId);
        Libary.saveBooksToSession();
        renderBooks();
        renderLibaryStats();
    }

    function readStatusClicked() {
        const tableRow = this.parentElement.parentElement;
        const bookId = parseInt(tableRow.id);
        Libary.getBook(bookId).haveRead = this.checked;
        Libary.saveBooksToSession();
        renderLibaryStats();
    }

    const renderErrorMessage = (textInput, errorMsg) => {
        const errorLabel = document.getElementById(`${textInput.id}-error`);
        textInput.classList.add("display-error");
        errorLabel.textContent = errorMsg;
        errorLabel.hidden = false;
    }

    const removeErrorMessage = (textInput) => {
        if (textInput) {
            textInput.classList.remove("display-error");
            document.getElementById(`${textInput.id}-error`).hidden = true;
        }
    }

    const removeErrorMessages = () => document.querySelectorAll(".display-error").forEach(element => removeErrorMessage(element));

    const renderSite = () => {
        Libary.loadBooksFromSession();
        DisplayCtrl.renderBooks();
        DisplayCtrl.renderLibaryStats();
    }

    return {
        renderBooks,
        renderLibaryStats,
        renderErrorMessage,
        removeErrorMessage,
        removeErrorMessages,
        renderSite
    }
})(Libary);


(function setUpSortSelection(Libary) {
    const sortSelect = document.querySelector("#sort-select");
    const directionSelect = document.querySelector("#sort-direct-select");

    Libary.getSortKeys().forEach(key => {
        const option = document.createElement("option");
        option.text = key;
        sortSelect.add(option);
    });

    const sortOptionSelected = () => {
        const sortAfter = sortSelect.options[sortSelect.selectedIndex].text;
        const direction = directionSelect.options[directionSelect.selectedIndex].text;
        Libary.sortBooks[sortAfter](direction === "asc" ? true : false);
        DisplayCtrl.renderBooks();
    }

    sortSelect.addEventListener("change", sortOptionSelected);
    directionSelect.addEventListener("change", sortOptionSelected);
})(Libary);


(function setUpNewBookModal(DisplayCtrl, Libary) {
    const modal = document.querySelector(".modal-window");
    const titleInput = modal.querySelector("#book-title");
    const authorInput = modal.querySelector("#book-author");
    const pagesInput = modal.querySelector("#book-pages");
    const publishedInput = modal.querySelector("#book-published");
    const statusInput = modal.querySelector("#book-status");

    const resetInput = () => {
        DisplayCtrl.removeErrorMessages();
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        publishedInput.value = "";
        statusInput.checked = false;
    }

    const addBookToLibary = () => {
        Libary.addBook(new Book(
            titleInput.value,
            authorInput.value,
            parseInt(publishedInput.value),
            parseInt(pagesInput.value),
            statusInput.checked
        ));
        Libary.saveBooksToSession();
    }

    const newBookClicked = () => modal.style["display"] = "block";

    const closeNewBookWindow = () => {
        resetInput();
        modal.style["display"] = "none";
    }

    const closeClicked = (event) => {
        if (event.target !== event.currentTarget) return;
        closeNewBookWindow();
    }

    const isValidInput = () => {
        let isValid = true
        if (titleInput.value.length <= 0) {
            DisplayCtrl.renderErrorMessage(titleInput, "Please enter a title");
            isValid = false;
        } else {
            DisplayCtrl.removeErrorMessage(titleInput);
        }
        if (authorInput.value.length <= 0) {
            DisplayCtrl.renderErrorMessage(authorInput, "Please enter a name");
            isValid = false;
        } else {
            DisplayCtrl.removeErrorMessage(authorInput);
        }
        if (pagesInput.value.length <= 0 || pagesInput.value <= 0) {
            DisplayCtrl.renderErrorMessage(pagesInput, "Enter a number greater than 0");
            isValid = false;
        } else {
            DisplayCtrl.removeErrorMessage(pagesInput);
        }
        if (publishedInput.value.length !== 4) {
            DisplayCtrl.renderErrorMessage(publishedInput, "Enter a year in the format: YYYY");
            return false;
        }
        const currentYear = new Date().getFullYear();
        if (publishedInput.value > currentYear) {
            DisplayCtrl.renderErrorMessage(publishedInput, "Release year can't be set in the future");
            isValid = false;
        } else {
            DisplayCtrl.removeErrorMessage(publishedInput);
        }
        return isValid;
    }

    const submitClicked = () => {
        if (!isValidInput()) return;
        addBookToLibary();
        DisplayCtrl.renderBooks();
        DisplayCtrl.renderLibaryStats();
        closeNewBookWindow();
    }

    document.querySelector(".add-book-btn").addEventListener("click", newBookClicked);
    document.querySelector(".close-btn").addEventListener("click", closeClicked);
    document.querySelector(".modal-window").addEventListener("click", closeClicked);
    document.querySelector("#book-submit-btn").addEventListener("click", submitClicked);
})(DisplayCtrl, Libary);


DisplayCtrl.renderSite();