export let myBooks = [];

export function Book(title, author, published, numberOfPages, haveRead = false) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.numberOfPages = numberOfPages;
    this.haveRead = haveRead;
    this.insertionDate = Date.now();
}
Book.prototype.info = function () { return `${this.title} by ${this.author}, ${this.numberOfPages}, ${this.haveRead ? "already read" : "not read yet"}.`; }
Book.prototype.setReadStatus = function (read) { this.haveRead = read; }

// -- Key - sortfunction mapping --
export const sortBooks = {
    "Insertion date": (ascending = true) => myBooks.sort((a, b) => ascending ? a.insertionDate - b.insertionDate : b.insertionDate - a.insertionDate),
    "Title": (ascending = true) => myBooks.sort((a, b) => ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)),
    "Author": (ascending = true) => myBooks.sort((a, b) => ascending ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author)),
    "Pages": (ascending = true) => myBooks.sort((a, b) => ascending ? a.numberOfPages - b.numberOfPages : b.numberOfPages - a.numberOfPages),
    "Published": (ascending = true) => myBooks.sort((a, b) => ascending ? a.published - b.published : b.published - a.published)
}

export const getTotalBooksRead = () => myBooks.filter((book) => book.haveRead).length;
export const getTotalPagesRead = () => myBooks.reduce((total, current) => current.haveRead ? total + current.numberOfPages : total, 0);

// -- Session storage --
const STORAGE_ID = "myBooks";

export function saveBooksToSession() {
    sessionStorage.setItem(STORAGE_ID, JSON.stringify(myBooks));
}

export function loadBooksFromSession() {
    myBooks = JSON.parse(sessionStorage.getItem(STORAGE_ID));
    if (myBooks !== null)
        sortBooks["Insertion date"]();
    else
        setDefaultData();
}

// -- Setting up default data --
function setDefaultData() {
    const dumpData1 = new Book("The Lord of the Rings", "J. R. R. Tolkien", 1954, 543, true);
    const dumpData2 = new Book("Lord of the Flies", "William Golding", 1954, 224, true);
    const dumpData3 = new Book("Der Steppenwolf", "H. Hesse", 1974, 277);
    const dumpData4 = new Book("The Green Mile", "S. King", 1999, 544, true);
    const dumpData5 = new Book("Blackout", "M. Elsberg", 2013, 832);
    dumpData1.insertionDate += 1;
    dumpData2.insertionDate += 2;
    dumpData3.insertionDate += 3;
    dumpData4.insertionDate += 4;
    dumpData5.insertionDate += 5;
    myBooks = [dumpData1, dumpData2, dumpData3, dumpData4, dumpData5];
}