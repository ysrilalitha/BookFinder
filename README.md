📖 Overview
Book Finder is a modern, responsive web application built with React that allows users to search, filter, and sort books using the Open Library API. A unique feature is the ability to search for books by uploading an image containing text, which utilizes Tesseract.js for Optical Character Recognition (OCR).

The application features a clean, segmented search bar inspired by modern UIs like Airbnb.

✨ Features
🔍 Search Functionality: Search books by title or author using the Open Library API.

🎚️ Filtering & Sorting: Filter results by Category (Fiction, Fantasy, Science, etc.) and sort them by Publication Year (Newest/Oldest First).

🖼️ OCR Image Search: Upload an image containing text (e.g., a book cover or a clipping) to automatically extract the text and use it as the search query.

🎨 Modern UI: Utilizes Tailwind CSS for a segmented, horizontally aligned search bar and a responsive design.

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
You need to have Node.js and npm (Node Package Manager) installed on your machine.

Installation
Clone the repository:

Bash

git clone [YOUR_REPOSITORY_URL]
cd book-finder
Install dependencies: The required packages include react, tesseract.js, and tailwindcss utilities.

Bash

npm install
# OR
yarn install
Run the application:

Bash

npm start
# OR
yarn start
The application will open automatically in your browser at http://localhost:3000.

⚙️ Project Structure
The core functionality of the application resides in these files:

src/App.js: Contains all the application logic, state management, API calls (searchBooks), OCR handling (handleImageSearch), and the complete JSX structure, including the segmented search bar.

src/components/BookList.jsx: (Assumed) Component responsible for rendering the list of book results.

src/styles.css: Contains Tailwind CSS directives and any global styles.

💻 Code Highlights
The segmented search bar is achieved using advanced Tailwind CSS Flexbox utilities directly within App.js:

JavaScript

<div className="flex items-center w-full max-w-4xl bg-white rounded-full shadow-2xl transition-shadow hover:shadow-xl">
    {/* ... segmented inputs using flex-col and border-l ... */}
</div>
State Management: The application uses React's useState hook to manage the search query, filters, book results, and loading state.

🤝 Contribution
If you have any suggestions or find any bugs, please feel free to open an issue or submit a pull request!
