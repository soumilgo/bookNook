import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const isDay = useSelector((state) => state.sidebar.isDay);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/resources/get/${id}`
        );
        const data = await response.json();
        setBook(data.data);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch book details", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div
      className={`flex w-full ${
        isDay ? "bg-[#f6faff] text-[#001B3D]" : "bg-gray-900 text-white"
      }`}
    >
      <div
        className={`grid grid-rows-3 gap-4 m-3 rounded-xl w-full ${
          isDay ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div className="row-span-1 grid grid-cols-3 gap-4 m-2">
          <div className="col-span-1">
            <img
              src={book.imageUrl}
              alt={book.name}
              className="object-cover rounded-xl"
            />
          </div>
          <div className="col-span-2 flex flex-row justify-start gap-10">
            <div className="flex flex-col justify-start gap-6">
              <p className="text-4xl font-bold capitalize">{book.name}</p>
              <div className="capitalize">
                <p className="font-semibold text-lg">Editors:</p>
                <p className="pl-3">{book.author.join(", ")}</p>
              </div>
              <p
                className={`capitalize text-end ${
                  isDay ? "text-gray-500" : "text-gray-300"
                }`}
              >
                {book.genre.join(", ")}
              </p>
              <p
                className={`capitalize text-end ${
                  isDay ? "text-gray-500" : "text-gray-300"
                }`}
              >
                {book.language}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p>Publication: {book.publication}</p>
              <p>Published Year: {book.publishedYear}</p>
              <p>Description: {book.description}</p>
              <p>Rating: {book.userRating}/5</p>
              <p>Number of Ratings: {book.numUserRated}</p>
            </div>
          </div>
        </div>
        <div className="row-span-2 h-full w-full">
          <iframe
            src={book.fileUrl}
            className="w-full h-full rounded-b-xl"
            title="book preview"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
