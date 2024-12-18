export const BookCard = ({ book }) => {
  return (
    <div
      key={book._id}
      className="bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <img
        src={`http://localhost:3000/BImages/${book.imagePath}`}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-secondary">{book.title}</h3>
        <p className="text-sm text-gray-500 mt-2">{book.description}</p>
        <div className="mt-4">
          <a
            href={`http://localhost:3000/books/${book.pdfPath}`}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            Read Book
          </a>
        </div>
      </div>
    </div>
  );
};
