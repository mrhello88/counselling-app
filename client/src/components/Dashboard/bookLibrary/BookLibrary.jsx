import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/Context";
import { BookCard } from "../../Cards/Book-Card/Book-Card";

export const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const { fetchData } = useAuth();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const responseData = await fetchData("http://localhost:3000/get-books");
        if (responseData.success) {
          setBooks(responseData.data);
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to fetch books");
      }
    };

    fetchBooks();
  }, [fetchData]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-primary">Books Library</h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};
