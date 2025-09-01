import { useEffect, useState } from "react";
import icon from "../assets/icon.svg";
import sidebar from "../assets/sidebar.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleSearchbar } from "../redux/actions";
import checkTokenValidity from "../middleware/checkLogin";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publications, setPublications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [ages, setAges] = useState([]);
  const [publishedIns, setPublishedIns] = useState([]);
  const [isHidden, setIsHidden] = useState(null);

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const isDay = useSelector((state) => state.sidebar.isDay);
  let isLoggedIn = checkTokenValidity();
  const role=JSON.parse(localStorage.getItem("userData")).role;

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleSearchbar = () => {
    dispatch(toggleSearchbar());
  };

  function processField(field) {
    if (Array.isArray(field)) {
      return field.filter(Boolean).map((item) => item.toLowerCase());
    } else if (field) {
      return [field.toLowerCase()];
    } else {
      return [];
    }
  }

  // const navigate= useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    isLoggedIn = false;
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      const response = await fetch("http://localhost:4000/resources/all");
      const resource = await response.json();
      // console.log(resource.data);
      // setResources(resource.data);

      const uniqueGenres = [
        ...new Set(
          resource.data.flatMap((resource) => processField(resource.genre))
        ),
      ];
      const uniqueAuthors = [
        ...new Set(
          resource.data.flatMap((resource) => processField(resource.author))
        ),
      ];
      const uniquePublications = [
        ...new Set(
          resource.data.flatMap((resource) =>
            processField(resource.publication)
          )
        ),
      ];
      const uniqueLanguages = [
        ...new Set(
          resource.data.flatMap((resource) => processField(resource.language))
        ),
      ];
      const uniqueAges = [
        ...new Set(
          resource.data.flatMap((resource) => processField(resource.age))
        ),
      ];
      const uniquePublishedIns = [
        ...new Set(
          resource.data.flatMap((resource) =>
            processField(resource.publishedIn)
          )
        ),
      ];

      setGenres(uniqueGenres);
      setAuthors(uniqueAuthors);
      setPublications(uniquePublications);
      setLanguages(uniqueLanguages);
      setAges(uniqueAges);
      setPublishedIns(uniquePublishedIns);
    };
    fetchResources();
  }, []);

  const hideDropdown = (currentFilter) => {
    isHidden === currentFilter ? setIsHidden(null) : setIsHidden(currentFilter);
  };

  return (
    <div className={`flex flex-col justify-between h-screen sticky top-0 ${isDay ? 'bg-white text-[#001B3D]' : 'bg-gray-900 text-white'}`}>
      <div
        className={`flex flex-col items-center justify-start py-4 ${
          isOpen ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        <div className="flex items-center justify-between pl-2 w-full">
          <div className={`flex items-center ${isOpen ? "gap-2" : "gap-3"}`}>
            <img src={icon} alt="logo" className="h-10 object-fill" />
          </div>
          <img
            src={sidebar}
            alt="sidebar"
            className={`h-8 object-fill transform translate-transform ${
              isOpen ? "rotate-0" : "rotate-180"
            } duration-500 hover:cursor-pointer`}
            onClick={handleToggleSidebar}
          />
        </div>
        <div
          className={`flex items-center ${
            isOpen ? "justify-start" : "justify-center"
          } gap-1 border border-[#e7e3e4] rounded-lg w-[95%] p-1 mb-4 mt-1`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="w-[95%] outline-none font-semibold"
            onClick={handleToggleSearchbar}
          />
          <div
            className={`bg-white rounded-lg p-1 text-[#757273] shadow-sm font-semibold ${
              isOpen ? "" : "hidden"
            }`}
          >
            Ctrl+K
          </div>
        </div>
        <Link
          to="/"
          className={`flex items-center ${
            isOpen ? "justify-start" : "justify-center"
          } gap-2 w-[95%] p-1 mt-2 hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-blue-600`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`${isOpen ? "size-5" : "size-8"}`}
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>
          <h4 className={`${isOpen ? "" : "hidden"}`}>Home</h4>
        </Link>
        <div
          className={`flex items-center ${
            isOpen ? "justify-start" : "justify-center "
          } gap-2 w-[95%] p-1 mt-1 hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-blue-600`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`${isOpen ? "size-5" : "size-8"}`}
          >
            <path
              fillRule="evenodd"
              d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
              clipRule="evenodd"
            />
          </svg>
          <h4 className={`${isOpen ? "" : "hidden"}`}>Collection</h4>
        </div>

        <Link
          to='/addbook'
          className={`${role==='admin'?"":"hidden"} flex items-center ${
            isOpen ? "justify-start" : "justify-center"
          } gap-2 w-[95%] p-1 mt-2 hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-blue-600`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`${isOpen ? "size-5" : "size-8"}`}
          >
            <path
              fillRule="evenodd"
              d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z"
              clipRule="evenodd"
            />
            <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
          </svg>

          <h4 className={`${isOpen ? "" : "hidden"}`}>Add Book</h4>
        </Link>
        <div
          className={`flex items-center ${
            isOpen ? "justify-start" : "justify-center"
          } gap-2 w-[95%] p-1 mt-5 hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-blue-600`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`${isOpen ? "size-5" : "size-8"}`}
          >
            <path
              fillRule="evenodd"
              d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
              clipRule="evenodd"
            />
          </svg>
          <h4 className={`${isOpen ? "" : "hidden"}`}>Filters</h4>
        </div>
        <div className={`flex w-[86%] ${isOpen ? "" : "hidden"}`}>
          {/* <img src={line} alt="line" className="w-[10%] h-full object-stretch" /> */}
          <div className="mt-1 flex flex-col gap-2 w-full border-l-3 border-[#757273]">
            <button
              onClick={() => hideDropdown("genre")}
              className="w-[95%] flex justify-between px-[5%] ml-2 py-[1%] hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-blue-600"
            >
              <p>Genre</p>
              {isHidden === "genre" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              )}
            </button>
            {isHidden === "genre" &&
              genres.map((genre, index) => (
                <li key={index} className="flex pl-[20%] capitalize">
                  <p>{genre}</p>
                </li>
              ))}

            <button
              onClick={() => hideDropdown("author")}
              className="w-[95%] flex justify-between px-[5%] ml-2 py-[1%] hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-blue-600"
            >
              <p>Author</p>
              {isHidden === "author" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              )}
            </button>
            {isHidden === "author" &&
              authors.map((author, index) => (
                <li key={index} className="flex pl-[20%] capitalize">
                  <p>{author}</p>
                </li>
              ))}

            <button
              onClick={() => hideDropdown("publication")}
              className="w-[95%] flex justify-between px-[5%] ml-2 py-[1%] hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-blue-600"
            >
              <p>Publication</p>
              {isHidden === "publication" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              )}
            </button>
            {isHidden === "publication" &&
              publications.map((publication, index) => (
                <li key={index} className="flex pl-[20%] capitalize">
                  <p>{publication}</p>
                </li>
              ))}

            <button
              onClick={() => hideDropdown("language")}
              className="w-[95%] flex justify-between px-[5%] ml-2 py-[1%] hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-blue-600"
            >
              <p>Language</p>
              {isHidden === "language" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              )}
            </button>
            {isHidden === "language" &&
              languages.map((language, index) => (
                <li key={index} className="flex pl-[20%] capitalize">
                  <p>{language}</p>
                </li>
              ))}

            <button
              onClick={() => hideDropdown("age")}
              className="w-[95%] flex justify-between px-[5%] ml-2 py-[1%] hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-blue-600"
            >
              <p>Age</p>
              {isHidden === "age" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              )}
            </button>
            {isHidden === "age" &&
              ages.map((age, index) => (
                <li key={index} className="flex pl-[20%] capitalize">
                  <p>{age}</p>
                </li>
              ))}

            <button
              onClick={() => hideDropdown("publishedIn")}
              className="w-[95%] flex justify-between px-[5%] ml-2 py-[1%] hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-blue-600"
            >
              <p>Relased In</p>
              {isHidden === "publishedIn" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#757273"
                  className="size-6 transition-transform duration-1000 transform rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              )}
            </button>
            {isHidden === "publishedIn" &&
              publishedIns.map((publishedIn, index) => (
                <li key={index} className="flex pl-[20%] capitalize">
                  <p>{publishedIn}</p>
                </li>
              ))}
          </div>
        </div>
      </div>
      <div
        className={`flex items-center ${
          isOpen ? "justify-start" : "justify-center"
        } gap-2 w-[95%] ml-2 p-1 mb-2 hover:bg-white hover:rounded-lg hover:cursor-pointer hover:shadow-sm hover:text-red-600`}
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>

        <h4
          className={`${isOpen ? "" : "hidden"} font-semibold`}
          onClick={handleLogout}
        >
          Logout
        </h4>
      </div>
    </div>
  );
};

export default Sidebar;
