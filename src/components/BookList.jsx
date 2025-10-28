import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books = [], hasSearched = false }) {
  if (!hasSearched) return null;

  if (hasSearched && books.length === 0) {
    return <p className="text-center text-gray-500">No books found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
      {books.map((book, index) => {
        const coverUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/150x200?text=No+Cover";

        return (
          <BookCard key={book.key || index} book={book} coverUrl={coverUrl} />
        );
      })}
    </div>
  );
}
