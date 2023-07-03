import React from "react";
// import BookListPage from "./BookListPage";

function HomePage() {
  return (
    <div>
      <h2>The Book Club  of Jeremy & Viktor</h2>
      <h3>Please sign up or login to see the available events and books</h3>
      <h4>After the registration or the sign in, just click the events or books title</h4>
      <div className="book-card-container">
        {/* <BookListPage /> */}
        <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="./images/1.jpg" class="d-block w-100" alt="first"/>
    </div>
    <div class="carousel-item">
      <img src="./images/2.jpg" class="d-block w-100" alt="second"/>
    </div>
    <div class="carousel-item">
      <img src="./images/3.jpg" class="d-block w-100" alt="third"/>
    </div>
  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>

  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>
    </div>
  );
}

export default HomePage;