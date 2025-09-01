import { useState, useRef } from "react";
import checkTokenValidity from "../middleware/checkLogin";
import { useNavigate } from "react-router-dom";

const Addbook = () => {
  const navigate = useNavigate();
  const isLoggedIn = checkTokenValidity();
  if (isLoggedIn === false) {
    navigate("/login");
  }

  const [book, setBook] = useState({
    bookName: "",
    authorName: "",
    genre: "",
    language: "",
    publication: "",
    publishedYear: "",
    age: "",
    description: "",
    pdf: null,
    coverImage: null,
  });

  // Refs for file inputs
  const pdfInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setBook((prevBook) => ({ ...prevBook, [type]: file }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(book);

    // Reset state
    setBook({
      bookName: "",
      authorName: "",
      genre: "",
      language: "",
      publication: "",
      publishedYear: "",
      age: "",
      description: "",
      pdf: null,
      coverImage: null,
    });

    // Clear file inputs manually
    if (pdfInputRef.current) pdfInputRef.current.value = "";
    if (coverInputRef.current) coverInputRef.current.value = "";
  };

  return (
    <div className="grid place-items-center bg-[#f6faff] rounded-xl p-5">
      <h1 className="font-bold text-3xl">Add Book</h1>
      <form className="flex flex-col p-5 bg-white rounded-xl" onSubmit={handlesubmit}>
        <div className="flex w-full">
          <input
            type="text"
            name="bookName"
            placeholder="Book Name"
            className="p-2 m-2 border-2 border-gray-300 rounded-md w-full"
            value={book.bookName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            className="p-2 m-2 border-2 border-gray-300 rounded-md w-full"
            value={book.authorName}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-full">
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={book.genre}
            onChange={handleInputChange}
            className="p-2 m-2 border-2 border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={book.language}
            onChange={handleInputChange}
            className="p-2 m-2 border-2 border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="flex w-full">
          <input
            type="text"
            name="publication"
            placeholder="Publication"
            value={book.publication}
            onChange={handleInputChange}
            className="p-2 m-2 border-2 border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            name="publishedYear"
            placeholder="Published Year"
            value={book.publishedYear}
            onChange={handleInputChange}
            className="p-2 m-2 border-2 border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="flex w-full">
          <div className="p-2">
            <label className="block text-gray-600 text-[20px] font-medium m-2 p-2">
              Upload Book
            </label>
            <input
              type="file"
              accept="application/pdf"
              ref={pdfInputRef}
              onChange={(e) => handleFileChange(e, "pdf")}
              className="self-center p-2 m-2 border-2 border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="p-2">
            <label className="block text-gray-600 text-[20px] font-medium m-2 p-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              ref={coverInputRef}
              onChange={(e) => handleFileChange(e, "coverImage")}
              className="self-center p-2 m-2 border-2 border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <textarea
          type="text"
          name="description"
          value={book.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="p-2 m-2 border-2 border-gray-300 rounded-md w-full min-h-32"
        />
        <input
          type="text"
          name="age"
          placeholder="Minimum Age"
          value={book.age}
          onChange={handleInputChange}
          className="self-center p-2 m-2 border-2 border-gray-300 rounded-md w-32"
        />
        <button
          type="submit"
          className="p-2 m-2 bg-gray-100 text-black border-black border-2 hover:bg-blue-500 rounded-md w-48 self-center"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Addbook;
