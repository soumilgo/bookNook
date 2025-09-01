import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./pages/homePage.jsx";
import Sidebar from "./components/sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import Addbook from "./pages/Addbook.jsx";
import BookPage from "./pages/BookPage.jsx";
import checkTokenValidity from "./middleware/checkLogin.js";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkValidity = checkTokenValidity();
    setIsLogin(checkValidity);
  },[setIsLogin]);

  return (
    <div
      className={`grid ${
        isOpen ? "grid-cols-6" : "grid-cols-14"
      } bg-[#FDFBF7] transition-all duration-500 ease-in-out`}
    > <Router>
      {isLogin && <Sidebar/>}
      <div
        className={`rounded-md ${
          isLogin===false ? "col-span-full": isOpen && isLogin? "col-span-5" : "col-span-13"
        }`}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/addbook" element={<Addbook />} />
            <Route path="/book/:id" element={<BookPage />} />
          </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
