import React from "react";
import BookItem from "./BookItem";

const BookList = ({ books }) => {
  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
};

export default BookList;
