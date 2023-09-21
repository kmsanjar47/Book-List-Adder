let form = document.querySelector("#input-form");
let titleInput = document.querySelector("#title-text");
let authorInput = document.querySelector("#author-text");
let isbnInput = document.querySelector("#isbn-text");
let table = document.querySelector("table");
let snackbar = document.querySelector(".snackbar");
let tableBody = document.querySelector("tbody");

//Classes

class BookModel {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//Event Listeners

document.addEventListener("DOMContentLoaded", getBooksFromLS);
form.addEventListener("submit", addBook);
tableBody.addEventListener("click", removeBook);

//Functions
function createTableRowFromObj(object) {
  let tr = document.createElement("tr");
  let title = document.createElement("td");
  let author = document.createElement("td");
  let isbn = document.createElement("td");
  let anchor = document.createElement("td");

  let a = document.createElement("a");
  a.setAttribute("href", "#");
  a.innerHTML = "x";

  title.innerHTML = object.title;
  author.innerHTML = object.author;
  isbn.innerHTML = object.isbn;

  anchor.appendChild(a);
  tr.appendChild(title);
  tr.appendChild(author);
  tr.appendChild(isbn);
  tr.appendChild(anchor);

  return tr;
}

function addBook(e) {
  if (
    titleInput.value.trim() != "" &&
    authorInput.value.trim() != "" &&
    isbnInput.value.trim() != "" &&
    !isNaN(isbnInput.value)
  ) {
    let newBook = new BookModel(
      titleInput.value,
      authorInput.value,
      isbnInput.value
    );
    let tbody = table.children[1];

    let tr = createTableRowFromObj(newBook);
    tbody.appendChild(tr);
    snackbar.style.display = "block";

    storeBookInLS(newBook);
    setTimeout(() => {
      snackbar.style.display = "none";
    }, 3000);
  } else {
    snackbar.style.display = "block";
    snackbar.style.backgroundColor = "red";
    snackbar.innerHTML = "Input Error !! Please Re-check and Try Again";
    setTimeout(() => {
      snackbar.style.display = "none";
    }, 3000);
  }
}

function removeBook(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      let td = e.target.parentElement;
      let tr = td.parentElement;
      removeBookFromLS(tr);
      tr.remove();
    }
  }
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

function removeBookFromLS(tableRowData) {
  let booksFromLS;
  let books = [];

  if (localStorage.getItem("books") === null) {
    booksFromLS = [];
  } else {
    booksFromLS = JSON.parse(localStorage.getItem("books"));
  }
  booksFromLS.forEach((bookObj) => {
    bookObj = JSON.parse(bookObj);
    let title = tableRowData.children[0].innerHTML;
    let author = tableRowData.children[1].innerHTML;
    let isbn = tableRowData.children[2].innerHTML;

    if (
      bookObj.title.toLowerCase() != title.toLowerCase() ||
      bookObj.author.toLowerCase() != author.toLowerCase() ||
      bookObj.isbn.toLowerCase() != isbn.toLowerCase()
    ) {
      books.push(JSON.stringify(bookObj));
    }
    localStorage.setItem("books", JSON.stringify(books));
    snackbar.style.display = "block";
    snackbar.style.backgroundColor = "red";
    snackbar.innerHTML = "Book Removed !!";
    setTimeout(() => {
      snackbar.style.display = "none";
    }, 3000);
  });
}
