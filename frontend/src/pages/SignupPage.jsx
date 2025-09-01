import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import checkTokenValidity from "../middleware/checkLogin";
import { useSelector } from "react-redux";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const isDay = useSelector((state) => state.sidebar.isDay);

  useEffect(() => {
    const loggedIn = checkTokenValidity();
    if (loggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };
    try {
      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.status === 201) {
        window.location.href = "/login";
      } else {
        alert("An error occurred during signup");
      }
    } catch (error) {
      console.error("Error during signup", error);
      alert("An error occurred during signup");
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen rounded-xl ${ isDay ? "bg-gray-100 text-[#001B3D]" : "bg-gray-900 text-white"}`}>
      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${ isDay ? "bg-white text-[#001B3D]" : "bg-gray-800 text-white"}`} >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium ${
                isDay ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                isDay ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                isDay ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                isDay ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p
          className={`text-center text-sm mt-4 ${
            isDay ? "text-gray-600" : "text-gray-300"
          }`}
        >
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
