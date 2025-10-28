export default function BookCard({ book, coverUrl }) {
  return (
    <div className="bg-white/60 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-4 flex flex-col items-center text-center border border-white/40">
      <img
        src={coverUrl}
        alt={book.title}
        className="h-48 w-36 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-blue-700">{book.title}</h3>
      <p className="text-gray-600 text-sm mt-1">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="text-gray-500 text-xs mt-1">
        {book.first_publish_year ? `📅 ${book.first_publish_year}` : ""}
      </p>
    </div>
  );
}
