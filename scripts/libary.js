export let myLibary = [];

export function Book(title, author, published, numberOfPages, haveRead = false) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.numberOfPages = numberOfPages;
    this.haveRead = haveRead;
    this.insertionDate = new Date();
}

Book.prototype.info = () => `${this.title} by ${this.author}, ${this.numberOfPages}, ${this.haveRead ? "already read" : "not read yet"}.`;
Book.prototype.setReadStatus = function(status) { this.haveRead = status; } 
    

export const libarySort = {
    "Insertion date": (ascending) => myLibary.sort((a, b) => ascending ? a.insertionDate - b.insertionDate : b.insertionDate - a.insertionDate),
    "Title": (ascending) => myLibary.sort((a, b) => ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)),
    "Author": (ascending) => myLibary.sort((a, b) => ascending ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author)),
    "Pages": (ascending) => myLibary.sort((a, b) => ascending ? a.numberOfPages - b.numberOfPages : b.numberOfPages - a.numberOfPages),
    "Published": (ascending) => myLibary.sort((a, b) => ascending ? a.published - b.published : b.published - a.published)
}

export const getTotalBooksRead = () => myLibary.filter((book) => book.haveRead).length;
export const getTotalPagesRead = () => myLibary.reduce((total, current) => current.haveRead ? total + current.numberOfPages : total, 0);


const dumpData1 = new Book("The Lord of the Rings", "J. R. R. Tolkien", 1954, 543, true);
const dumpData2 = new Book("Lord of the Flies", "William Golding", 1954, 224, true);
const dumpData3 = new Book("Der Steppenwolf", "H. Hesse", 1974, 277);
const dumpData4 = new Book("The Green Mile", "S. King", 1999, 544, true);
const dumpData5 = new Book("Blackout", "M. Elsberg", 2013, 832);
dumpData1.insertionDate.setMilliseconds(11);
dumpData2.insertionDate.setMilliseconds(12);
dumpData3.insertionDate.setMilliseconds(13);
dumpData4.insertionDate.setMilliseconds(14);
dumpData5.insertionDate.setMilliseconds(15);
myLibary = [...myLibary, dumpData1, dumpData2, dumpData3, dumpData4, dumpData5];