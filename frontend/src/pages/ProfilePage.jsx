import { useEffect, useState } from "react";
import checkTokenValidity from "../middleware/checkLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const isDay = useSelector((state) => state.sidebar.isDay);

  useEffect(() => {
    const isLoggedIn = checkTokenValidity();
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      fetchUserData(storedUserData.userId);
    }
  }, [navigate]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/users/get/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${isDay ? 'bg-[#f6faff] text-[#001B3D]' : 'bg-gray-900 text-white'}`}>
      <div className={`p-8 rounded-lg shadow-lg w-96 ${isDay ? 'bg-white text-[#001B3D]' : 'bg-gray-800 text-white'}`}>
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="mb-4 flex items-center gap-4 capitalize">
          <p className={`${isDay ? 'text-gray-600' : 'text-gray-300'}`}>Name:</p>
          <p className="text-lg font-semibold">{userData.name}</p>
        </div>
        <div className="mb-4 flex items-center gap-4 capitalize">
          <p className={`${isDay ? 'text-gray-600' : 'text-gray-300'}`}>Email:</p>
          <p className="text-lg font-semibold">{userData.email}</p>
        </div>
        <div className="mb-4 flex items-center gap-4 capitalize">
          <p className={`${isDay ? 'text-gray-600' : 'text-gray-300'}`}>Books Issued:</p>
          <p className="text-lg font-semibold">{userData.progress.length} books</p>
        </div>
        <div className="mb-4 flex items-center gap-4 capitalize"> 
          <p className={`${isDay ? 'text-gray-600' : 'text-gray-300'}`}>Wishlist:</p>
          <p className="text-lg font-semibold">{userData.wishlist.length} items</p>
        </div>
        <div className="mb-4 flex items-center gap-4 capitalize">
          <p className={`${isDay ? 'text-gray-600' : 'text-gray-300'}`}>Account Created:</p>
          <p className="text-lg font-semibold">{new Date(userData.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
