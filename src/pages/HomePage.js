import React from "react";
import BookListPage from "./BookListPage";

function HomePage() {
  return (
    <div>
      <h1>The Book Club  of Jeremy & Viktor</h1>
      <h2>Please sign up or login to see the available events and books</h2>
      <div className="book-card-container">
        <BookListPage />
      </div>
    </div>
  );
}

export default HomePage;