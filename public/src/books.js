function findAuthorById(authors, id) {
  for (let i = 0; i < authors.length; i++) {
    let currentAuthor = authors[i];
    if (id === currentAuthor.id) {
      return currentAuthor;
    }
  }
}

function findBookById(books, id) {
  let matchingBooks = books.find((book) => book.id === id);
  return matchingBooks;
}

function partitionBooksByBorrowedStatus(books) {
  let returnedOrNot = false;
  let returnedBooks = [];
  let checkedOutBooks = [];
  let sortedBooks = [];
  for (let i = 0; i < books.length; i++) {
    let currentBook = books[i];
    returnedOrNot = currentBook.borrows.every(
      (borrow) => borrow.returned === true
    );
    if (returnedOrNot === true) {
      returnedBooks.push(currentBook);
    } else if (returnedOrNot === false) {
      checkedOutBooks.push(currentBook);
    }
  }
  sortedBooks[0] = checkedOutBooks;
  sortedBooks[1] = returnedBooks;
  return sortedBooks;
}

function getBorrowersForBook(book, accounts) {
  let userID;
  let usersWhoBorrowed = [];
  let returnedValues = [];
  for (let i = 0; i < book.borrows.length && i < 10; i++) {
    let currentBorrow = book.borrows[i];
    userID = currentBorrow.id;
    returnedValues.push(currentBorrow.returned);
    for (let j = 0; j < accounts.length; j++) {
      if (userID === accounts[j].id) {
        usersWhoBorrowed.push(accounts[j]);
      }
    }
  }
  for (let i = 0; i < returnedValues.length; i++) {
    usersWhoBorrowed.map((user) => (user["returned"] = returnedValues[i]));
  }
  return usersWhoBorrowed;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
