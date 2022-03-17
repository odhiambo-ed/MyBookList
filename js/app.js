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

class BookList{
    constructor(){
        this.bookArr = [];

        // check if books are already stored in the localStorage
        if (localStorage.getItem('books') !== null) {
            // collect array of books from local storage
            this.bookArr = JSON.parse(localStorage.getItem('books'));

            //loop through books to display them to browser
            for(let i =0; i < this.bookArr.length; i++) {
                this.displayBook(this.bookArr[i]);
            }
        }

    }    

    addBook(author, title, isbn){
        const book = {
            title: title,
            author: author,
            isbn: isbn,
        }

        this.bookArr.push(book);

        this.displayBook(book);

        localStorage.setItem('books', JSON.stringify(this.bookArr));

    }

    displayBook(book){
       
        let tr = document.createElement('tr');
        tr.setAttribute('data-isbn', isbn);
        tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td class = ""><a href="#" class = "btn btn-sm btn-danger delete">X</a></td>`;

        document.querySelector('#book-list').appendChild(tr);
    }

    removeBook(isbn){
        this.bookArr = this.bookArr.filter(book => { return book.isbn != isbn });

        localStorage.setItem('books', JSON.stringify(this.bookArr));
    }
}

const bookList = new BookList();

// Submit Event Listener
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const isbn = document.querySelector("#isbn").value;

    bookList.addBook(author, title, isbn);

});

// Event listener when the user clicks on remove button
document.addEventListener('click', (e) => {
    let deleteButton = e.target;
    
    if (deleteButton !== undefined && deleteButton.classList.contains('delete')) {
        e.preventDefault();
        let tr = deleteButton.closest('tr');
        let isbn = tr.getAttribute('data-isbn');
        tr.remove();

        bookList.removeBook(isbn);
    }
  });