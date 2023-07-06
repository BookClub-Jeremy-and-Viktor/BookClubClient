import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventListPage from "./pages/EventListPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";
import EditBookPage from "./pages/EditBookPage";
import BookListPage from "./pages/BookListPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";


function App() {
  return (
    <div className="App">
      <Navbar />

      
      <Routes>      
        <Route path="/" element={<HomePage />} />

          <Route
          path="/events"
          element={ <IsPrivate> <EventListPage /> </IsPrivate> } 
        />

        <Route
          path="/books"
          element={ <IsPrivate> <BookListPage /> </IsPrivate> } 
        />

        <Route
          path="/events/:eventId"
          element={ <IsPrivate> <EventDetailsPage /> </IsPrivate> }
        />

        <Route
          path="/books/:bookId"
          element={ <IsPrivate> <BookDetailsPage /> </IsPrivate> }
        />

        <Route
          path="/events/edit/:eventId"
          element={ <IsPrivate> <EditEventPage /> </IsPrivate> } 
        />

<Route
          path="/books/edit/:bookId"
          element={ <IsPrivate> <EditBookPage /> </IsPrivate> } 
        />
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;
