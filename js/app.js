// Book Class
// class Book {
//     constructor(title, author, isbn) {
//         this.title = title;
//         this.author = author;
//         this.isbn = isbn;
//     }
// }

// Create a Car Class

// class Car {
//
//      constructor (name, type) {
//         this.name = name;
//         this.type = type;
//     }
// }

// let carOne = new Car('Insight', 'Honda');
// let carTwo = new Car('320i', 'BMW');

// console.log(carOne.name)

class BookList {
  constructor() {
    this.bookArr = [];

    // check if books are already stored in the localStorage
    if (localStorage.getItem('books') !== null) {
      // collect array of books from local storage
      this.bookArr = JSON.parse(localStorage.getItem('books'));

      // loop through books to display them to browser
      for (let i = 0; i < this.bookArr.length; i += 1) {
        this.displayBook(this.bookArr[i].isbn);
      }
    }
  }

  addBook(bookAuthor, bookTitle, bookIsbn) {
    const book = {
      title: bookTitle,
      author: bookAuthor,
      isbn: bookIsbn,
    };

    this.bookArr.push(book);

    this.displayBook(book.isbn);

    localStorage.setItem('books', JSON.stringify(this.bookArr));
  }

  displayBook(isbn) {
    let book;

    // loop through books to display them to browser
    for (let i = 0; i < this.bookArr.length; i += 1) {
      if (this.bookArr[i].isbn === isbn) {
        book = this.bookArr[i];
      }
    }

    const tr = document.createElement('tr');
    tr.setAttribute('data-isbn', book.isbn);
    tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td class = ""><a href="#" class = "btn btn-sm btn-danger delete">X</a></td>`;

    document.querySelector('#book-list').appendChild(tr);
  }

  removeBook(isbn) {
    this.bookArr = this.bookArr.filter((book) => book.isbn !== isbn);

    localStorage.setItem('books', JSON.stringify(this.bookArr));
  }
}

const bookList = new BookList();

// Submit Event Listener
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const author = document.querySelector('#author').value;
  const title = document.querySelector('#title').value;
  const isbn = document.querySelector('#isbn').value;

  bookList.addBook(author, title, isbn);

  document.querySelector('#author').value = '';
  document.querySelector('#title').value = '';
  document.querySelector('#isbn').value = '';
});

// Event listener when the user clicks on remove button
document.addEventListener('click', (e) => {
  const deleteButton = e.target;

  if (deleteButton !== undefined && deleteButton.classList.contains('delete')) {
    e.preventDefault();
    const tr = deleteButton.closest('tr');
    const isbn = tr.getAttribute('data-isbn');
    tr.remove();

    bookList.removeBook(isbn);
  }
});