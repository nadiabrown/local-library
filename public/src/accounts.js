function findAccountById(accounts, id) {
  for (let account in accounts) {
    if (accounts[account].id === id) {
      return accounts[account];
    }
  }
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const currentAccountId = account.id;
  let numOfBorrows = 0;
  for (let book in books) {
    let currentBook = books[book];
    for (let borrow in currentBook.borrows) {
      if (currentAccountId === currentBook.borrows[borrow].id) {
        numOfBorrows += 1;
      }
    }
  }
  return numOfBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let accountId = account.id;
  let checkedOutBooks = [];
  let authorId;
  for (let i = 0; i < books.length; i++) {
    let currentBook = books[i];
    for (let j = 0; j < currentBook.borrows.length; j++) {
      if (
        currentBook.borrows[j].returned === false &&
        accountId === currentBook.borrows[j].id
      ) {
        checkedOutBooks.push(books[i]);
        authorId = currentBook.authorId;
      }
    }
  }
  let authorInfo = getAuthor(authorId, authors);

  checkedOutBooks.forEach((book) => (book["author"] = authorInfo));
  return checkedOutBooks;
}

// helper function
function getAuthor(currentAuthorId, authors) {
  for (let i = 0; i < authors.length; i++) {
    if (currentAuthorId === authors[i].id) {
      return authors[i];
    }
  }
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
