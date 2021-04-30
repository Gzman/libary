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