function getTotalBooksCount(books) {
  let totalBooks = books.reduce((total, book) => {
    return (total += 1);
  }, 0);
  return totalBooks;
}

function getTotalAccountsCount(accounts) {
  let totalAccounts = accounts.reduce((total, book) => {
    return (total += 1);
  }, 0);
  return totalAccounts;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = books.filter(
    (book) => book.borrows[0].returned === false
  );
  let totalBooksBorrowed = borrowedBooks.reduce((total, borrowedBook) => {
    return (total += 1);
  }, 0);
  return totalBooksBorrowed;
}

function getMostCommonGenres(books) {
  let historicalFictionCount = 0;
  let scienceCount = 0;
  let classicsCount = 0;
  let travelCount = 0;
  let youngAdultCount = 0;
  let nonfictionCount = 0;
  let topFiveGenres = [];

  for (let i = 0; i < books.length; i++) {
    let currentBook = books[i];
    if (currentBook.genre === "Historical Fiction") {
      historicalFictionCount += 1;
    } else if (currentBook.genre === "Science") {
      scienceCount += 1;
    } else if (currentBook.genre === "Classics") {
      classicsCount += 1;
    } else if (currentBook.genre === "Travel") {
      travelCount += 1;
    } else if (currentBook.genre === "Young Adult") {
      youngAdultCount += 1;
    } else if (currentBook.genre === "Nonfiction") {
      nonfictionCount += 1;
    }
  }

  let genreCount = [
    { name: "Historical Fiction", count: historicalFictionCount },
    { name: "Science", count: scienceCount },
    { name: "Classics", count: classicsCount },
    { name: "Travel", count: travelCount },
    { name: "Young Adult", count: youngAdultCount },
    { name: "Nonfiction", count: nonfictionCount },
  ];

  genreCount.sort((current, next) => (current.count < next.count ? 1 : -1));

  for (let i = 0; i < 5; i++) {
    topFiveGenres.push(genreCount[i]);
  }
  return topFiveGenres;
}

function getMostPopularBooks(books) {
  let count;
  let bookBorrows = [];
  let topFiveBooks = [];
  for (let i = 0; i < books.length; i++) {
    count = books[i].borrows.length;
    bookBorrows.push({ name: books[i].title, count: count });
  }
  bookBorrows.sort((current, next) => (current.count < next.count ? 1 : -1));

  for (let i = 0; i < 5; i++) {
    topFiveBooks.push(bookBorrows[i]);
  }
  return topFiveBooks;
}

function getMostPopularAuthors(books, authors) {
  let authorsBorrows = [];
  let topFiveAuthors = [];
  for (let i = 0; i < authors.length; i++) {
    let count = 0;
    for (let j = 0; j < books.length; j++) {
      let currentAuthor = authors[i];
      if (currentAuthor.id === books[j].authorId) {
        count += books[j].borrows.length;
        authorsBorrows.push({
          name: currentAuthor.name.first + " " + currentAuthor.name.last,
          count: count,
        });
      }
    }
  }
  authorsBorrows.sort((current, next) => (current.count < next.count ? 1 : -1));
  for (let i = 0; i < 5; i++) {
    topFiveAuthors.push(authorsBorrows[i]);
  }
  return topFiveAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
