import React, { useState } from "react";

const AddBook = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && year) {
      addBook({ id: Date.now(), title, author, year });
      setTitle("");
      setAuthor("");
      setYear("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
