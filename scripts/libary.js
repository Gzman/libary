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

export const libarySort = {
    "Insertion date": (ascending) => myLibary.sort((a, b) => ascending ? a.insertionDate - b.insertionDate : b.insertionDate - a.insertionDate),
    "Title": (ascending) => myLibary.sort((a, b) => ascending ? a.title > b.title : b.title > a.title),
    "Author": (ascending) => myLibary.sort((a, b) => ascending ? a.author > b.author : b.author > a.author),
    "Pages": (ascending) => myLibary.sort((a, b) => ascending ? a.numberOfPages - b.numberOfPages : b.numberOfPages - a.numberOfPages),
    "Published": (ascending) => myLibary.sort((a, b) => ascending ? a.published - b.published : b.published - a.published)
}


const dumpData1 = new Book("The Lord of the Rings", "J. R. R. Tolkien", 1954, 543, true);
const dumpData2 = new Book("Lord of the Flies", "William Golding", 1954, 224, true);
const dumpData3 = new Book("Der Steppenwolf", "H. Hesse", 1974, 277);
const dumpData4 = new Book("The Green Mile", "S. King", 1999, 544);
dumpData1.insertionDate.setSeconds(1);
dumpData2.insertionDate.setSeconds(2);
dumpData3.insertionDate.setSeconds(3);
dumpData4.insertionDate.setSeconds(4);
myLibary = [...myLibary, dumpData1, dumpData2, dumpData3, dumpData4];