let form = document.querySelector("#input-form");
let titleInput = document.querySelector("#title-text");
let authorInput = document.querySelector("#author-text");
let isbnInput = document.querySelector("#isbn-text");
let table = document.querySelector("table");

//Classes

class BookModel {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//Event Listeners
form.addEventListener("submit", addBook);
document.addEventListener("DOMContentLoaded", getBooksFromLS);

//Functions
function createTableRowFromObj(object) {
  let tr = document.createElement("tr");

  let title = document.createElement("td");
  let author = document.createElement("td");
  let isbn = document.createElement("td");

  title.innerHTML = object.title;
  author.innerHTML = object.author;
  isbn.innerHTML = object.isbn;

  tr.appendChild(title);
  tr.appendChild(author);
  tr.appendChild(isbn);

  return tr;
}

function addBook(e) {
  let newBook = new BookModel(
    titleInput.value,
    authorInput.value,
    isbnInput.value
  );

  let tbody = table.children[1];

  let tr = createTableRowFromObj(newBook);
  tbody.appendChild(tr);

  storeBookInLS(newBook);

  e.preventDefault();
}

//Local Storage
function getBooksFromLS() {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.forEach((book) => {
    let newBookObj = JSON.parse(book);
    let tbody = table.children[1];
    tbody.appendChild(createTableRowFromObj(newBookObj));
  });
}

function storeBookInLS(book) {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  books.push(JSON.stringify(book));
  localStorage.setItem("books", JSON.stringify(books));
}
