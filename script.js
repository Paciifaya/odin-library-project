const myLibrary = [{ title: "The Great Gatsby", author: "F. Scott Filtgerald", pages: 331, read: true }, { title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", pages: 320, read: false }, { title: "Little Women", author: "Louisa May Alcott", pages: 449, read: true },];

function Book(title, author, pages, read) {

  this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read))
}

const createBook = (book) => {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.id = myLibrary.indexOf(book);

  const bookTitle = document.createElement("h1");
  bookTitle.classList.add("book-title");

  const bookAuthor = document.createElement("h2");
  bookAuthor.classList.add("book-author");

  const bookPages = document.createElement("p");
  bookPages.classList.add("book-pages");

  const readCheckbox = document.createElement("button");
  readCheckbox.classList.add('btn-read')


  const delButton = document.createElement("div");
  delButton.classList.add("del-button");

  document.querySelector(".book-wrap").appendChild(bookDiv);
  bookDiv.append(bookTitle, bookAuthor, bookPages, readCheckbox, delButton);

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = `${book.pages} pages`;

  if (book.read === true) {
    readCheckbox.textContent = 'read';
    readCheckbox.style.backgroundColor = "#9fff9c";
  } else {
    readCheckbox.textContent = 'not read';
    readCheckbox.style.backgroundColor = "#9d3131";
  }

  readCheckbox.addEventListener("click", () => {
    if (readCheckbox.textContent === 'read') {
      readCheckbox.textContent = 'not read';
      readCheckbox.style.backgroundColor = "#9d3131";
    } else {
      readCheckbox.textContent = 'read';
      readCheckbox.style.backgroundColor = "#9fff9c";
    }
  })

  delButton.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    renderBooks();
  })
}

const renderBooks = () => {
  document.querySelector(".book-wrap").innerHTML = "";
  myLibrary.map((book) => createBook(book));
}

// Get new book data from form

const form = document.getElementById("book-form");

form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const newBook = {};
  const checkbox = formData.get("read");
  if (!checkbox) {
    formData.append("read", false);
  } else {
    formData.append("read", true);
  }

  formData.forEach((value, key) => (newBook[key] = value));

  addBookToLibrary(
    newBook.title,
    newBook.author,
    newBook.pages,
    newBook.read
  );
  form.reset();
  renderBooks();
}

// Modal

const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open-modal");
const closeButton = document.querySelector(".close-button");

openModal.addEventListener("click", () => modal.style.display = "block");
openModal.addEventListener('click', () => form.style.display = 'flex')
closeButton.addEventListener("click", () => {
  modal.style.display = "none"
  form.style.display = "flex";
});

renderBooks();


