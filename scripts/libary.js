export class Book {
    constructor(title, author, published, numberOfPages, haveRead = false) {
        this.title = title;
        this.author = author;
        this.published = published;
        this.numberOfPages = numberOfPages;
        this.haveRead = haveRead;
        this.insertionDate = Date.now();
    }
    info() {
        return `${this.title} by ${this.author}, ${this.numberOfPages}, ${this.haveRead ? "already read" : "not read yet"}.`;
    }
}

export const Libary = (() => {
    let books = [];
    const myBooks = () => books;
    const getBook = (index) => books[index];
    const removeBook = (index) => books.splice(index, 1);
    const addBook = (book) => books.push(book);

    const sortBooks = {
        "Insertion date": (ascending = true) => books.sort((a, b) => ascending ? a.insertionDate - b.insertionDate : b.insertionDate - a.insertionDate),
        "Title": (ascending = true) => books.sort((a, b) => ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)),
        "Author": (ascending = true) => books.sort((a, b) => ascending ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author)),
        "Pages": (ascending = true) => books.sort((a, b) => ascending ? a.numberOfPages - b.numberOfPages : b.numberOfPages - a.numberOfPages),
        "Published": (ascending = true) => books.sort((a, b) => ascending ? a.published - b.published : b.published - a.published)
    };
    const getSortKeys = () => Object.keys(sortBooks);

    const getTotalBooksRead = () => books.filter((book) => book.haveRead).length;
    const getTotalPagesRead = () => books.reduce((total, book) => book.haveRead ? total + book.numberOfPages : total, 0);

    const STORAGE_ID = "myBooks";
    const saveBooksToSession = () => sessionStorage.setItem(STORAGE_ID, JSON.stringify(books));
    const loadBooksFromSession = () => {
        books = JSON.parse(sessionStorage.getItem(STORAGE_ID));
        books !== null ? sortBooks["Insertion date"]() : (() => {
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
            books = [dumpData1, dumpData2, dumpData3, dumpData4, dumpData5];
        })();
    };

    return {
        myBooks,
        getBook,
        addBook,
        removeBook,
        sortBooks,
        getSortKeys,
        getTotalBooksRead,
        getTotalPagesRead,
        saveBooksToSession,
        loadBooksFromSession,
    }
})();