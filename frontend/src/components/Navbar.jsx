import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../redux/actions";
import checkTokenValidity from "../middleware/checkLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const isDay = useSelector((state) => state.sidebar.isDay);
  const isLoggedIn = checkTokenValidity();
  const data = JSON.parse(localStorage.getItem("userData"));
  const userId = data?.userId;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  // console.log("userData");
  const handleMode = () => {
    dispatch(toggleMode());
  };

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:4000/users/get/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.log("failed to fetch user", error);
      }
    };

    if (userId !== undefined) fetchUserData(userId);
  }, [userId]);
  const userInitials = userData !== null ? userData.name[0] : "";
  const userName = userData !== null ? userData.name : "";

  return (
    <nav className={`w-full py-2 px-2 ${isDay ? 'bg-transparent text-[#001B3D]' : 'bg-gray-900 text-white'}`}>
      <div className="flex justify-between items-center">
        <div className=" text-2xl font-bold">LibBooks</div>
        <div className="flex gap-4 mr-3">
          <button
            className={`border-[#e7e3e4] rounded-full p-1 ${
              isDay ? "bg-[#EFF6FB]" : "bg-black"
            } transition-all duration-300 ease-in-out 
             hover:shadow-[0_0_10px_#50a2ff] 
             active:scale-90`}
            onClick={handleMode}
          >
            {!isDay ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#50a2ff"
                className="size-6"
              >
                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
              </svg>
            )}
          </button>
          <button
            className="border-[#e7e3e4] rounded-full p-1 bg-[#EFF6FB] 
             transition-all duration-300 ease-in-out 
             hover:shadow-[0_0_10px_#50a2ff] 
             active:scale-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#50a2ff"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="border-[#e7e3e4] rounded-full p-1 bg-[#EFF6FB] 
             transition-all duration-300 ease-in-out 
             hover:shadow-[0_0_10px_#50a2ff] 
             active:scale-90"
          >
            {isLoggedIn ? (
              <div onClick={() => navigate('/profile')}
                className="flex items-center justify-center gap-1">
                <span className="flex items-center justify-center bg-[#50a2ff] text-white rounded-full size-6 capitalize">
                  {userInitials}
                </span>
                <p className="text-[#001B3D] capitalize font-semibold">
                  welcome, {userName}!
                </p>
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#50a2ff"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
