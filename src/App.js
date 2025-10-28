import React, { useState } from "react";
import Tesseract from "tesseract.js";
import BookList from "./components/BookList";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // 🔍 Fetch books based on query

  const searchBooks = async (q) => {
    if (!q.trim()) return;

    setLoading(true);
    setError("");
    setBooks([]);
    setHasSearched(true);

    try {
      let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
        q
      )}`;
      if (category !== "all") url += `+subject:${category}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.docs || data.docs.length === 0) {
        setError("No books found.");
        setBooks([]);
      } else {
        let resultBooks = data.docs.slice(0, 30);
        resultBooks = resultBooks.sort((a, b) => {
          const ya = a.first_publish_year || 0;
          const yb = b.first_publish_year || 0;
          return sortOrder === "newest" ? yb - ya : ya - yb;
        });
        setBooks(resultBooks);
      }
    } catch (e) {
      setError("Failed to fetch books.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }; // 🖼️ OCR Search from image

  const handleImageSearch = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setBooks([]);
    setHasSearched(true);

    try {
      // Step 1: Extract text with Tesseract
      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng");

      // Step 2: Clean up OCR text
      const cleanedLines = text
        .split("\n")
        .map((l) => l.replace(/[^a-zA-Z0-9\s]/g, "").trim())
        .filter((l) => l.length > 2);

      console.log("🧾 OCR Lines:", cleanedLines);

      // Step 3: Prioritize longer lines (most likely the title)
      const sortedLines = cleanedLines.sort((a, b) => b.length - a.length);

      let resultFound = false;

      // Step 4: Loop through multiple possible title candidates
      for (let line of sortedLines) {
        // Ignore generic words
        const ignoreWords = [
          "edition",
          "comprehensive",
          "guide",
          "volume",
          "textbook",
        ];
        const filtered = line
          .split(" ")
          .filter(
            (w) =>
              w.length > 2 && !ignoreWords.includes(w.toLowerCase()) && isNaN(w)
          )
          .join(" ");

        if (!filtered || filtered.length < 3) continue;

        console.log("🔍 Trying search:", filtered);

        const found = await fetchBooks(filtered);
        if (found) {
          resultFound = true;
          break;
        }
      }

      if (!resultFound) {
        setError("No matching books found. Try a clearer image or title text.");
      }
    } catch (err) {
      console.error(err);
      setError("OCR or search failed. Try again with a clearer image.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function
  const fetchBooks = async (queryText) => {
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(queryText)}`
      );
      const data = await res.json();

      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs.slice(0, 30));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Fetch failed:", e);
      return false;
    }
  };

  return (
    <div className="main">
      {" "}
      {/* 🌟 Header Section: Contains the Title and the Styled Search Bar */}   
       {" "}
      <div className="backdrop-blur-md bg-white/60 shadow-lg rounded-2xl px-8 py-6 w-full max-w-5xl text-center mb-8 border border-white/40">
               {" "}
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow-sm text-center">
                    📚 Book Finder        {" "}
        </h1>
               {" "}
        {/* 🔍 Styled Search Controls: Aligned and expanded using flex properties */}
               {" "}
        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
                   {" "}
          <input
            type="text"
            placeholder="🔎 Search by title or author         "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 w-full flex-grow focus:ring-2 focus:ring-blue-400 outline-none bg-purple-50"
          />
                   {" "}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400 outline-none bg-purple-50"
          >
                        <option value="all">All Categories</option>           {" "}
            <option value="fiction">Fiction</option>           {" "}
            <option value="fantasy">Fantasy</option>           {" "}
            <option value="science">Science</option>           {" "}
            <option value="romance">Romance</option>           {" "}
            <option value="history">History</option>         {" "}
          </select>
                   {" "}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-pink-400 outline-none bg-purple-50"
          >
                        <option value="newest">Newest First</option>           {" "}
            <option value="oldest">Oldest First</option>         {" "}
          </select>
                   {" "}
          <button
            onClick={() => searchBooks(query)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-indigo-500 hover:to-blue-600 transition-all shadow-md font-semibold w-full sm:w-auto"
          >
                        Search          {" "}
          </button>
                    {/* 📸 Upload Button */}{" "}
          <label className="cursor-pointer w-full sm:w-auto">
            {" "}
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 text-white px-6 py-3 rounded-xl shadow-md font-semibold hover:from-orange-400 hover:to-yellow-400 transition-all flex items-center gap-2 justify-center w-full"></span>{" "}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSearch}
              className="hidden"
            />
                     {" "}
          </label>{" "}
        </div>{" "}
      </div>
      {/* 💬 Feedback + Book List (Content below header) */}     {" "}
      {loading && (
        <p className="text-gray-600 text-lg animate-pulse">
          Loading results...{" "}
        </p>
      )}
            {/* Splash Screen - Centered in remaining vertical space */}     {" "}
      {!hasSearched && !loading && (
        <div className="flex flex-col items-center justify-center flex-grow text-gray-700">
          {" "}
          {/* ADDED flex-grow */}         {" "}
          <img
            src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            alt="Books illustration"
            // Change to a custom CSS class name
            className="splash-image opacity-80 mb-4" // Keep opacity and margin if desired
          />
                   {" "}
        </div>
      )}
           {" "}
      {hasSearched && !loading && books.length === 0 && !error && (
        <p className="text-center text-gray-700 mt-10 text-lg">
                    No books found 😢        {" "}
        </p>
      )}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>} 
          {/* 📚 Book Results */}     {" "}
      <div className="w-full max-w-6xl mt-6">
                <BookList books={books} hasSearched={hasSearched} />     {" "}
      </div>
         {" "}
    </div>
  );
}
