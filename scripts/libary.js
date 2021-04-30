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

myLibary.push(new Book("Der Stein der Weisen", "J. Rowling", 1998, 256));
myLibary.push(new Book("The Lord of the Rings", "J. R. R. Tolkien", 1954, 543));
myLibary.push(new Book("Lord of the Flies", "William Golding", 1954, 224));
myLibary.push(new Book("It", "S. King", 1986, 1138, true));
myLibary.push(new Book("The Green Mile", "S. King", 1999, 544));