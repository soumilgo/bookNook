const BookItem = ({ book }) => {
    return (
      <li>
        <h3>{book.title}</h3>
        <p>by {book.author}</p>
        <p>Year: {book.year}</p>
      </li>
    );
  };
  
  export default BookItem;
  