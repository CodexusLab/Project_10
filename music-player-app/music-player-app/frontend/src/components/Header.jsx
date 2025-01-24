import { useEffect, useRef, useState } from "react";
import { FaMusic } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import DiscoverMusic from "../pages/DiscoverMusic";
import Playing from "../pages/Playing";
import TrackList from "../pages/TrackList";
import { Link } from "react-router-dom";

const Header = () => {
  const navbarRef = useRef(null);
  const sidebarRef = useRef(null);
  const navClosedRef = useRef(null);
  const navOpenRef = useRef(null);

  const [selectedMusicId, setSelectedMusicId] = useState(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    const sidebar = sidebarRef.current;

    if (navbar && sidebar) {
      sidebar.style.top = `${navbar.clientHeight - 1}px`;
    }
  }, []);

  const toggleSidebar = () => {
    const sidebar = sidebarRef.current;
    const navClosed = navClosedRef.current;
    const navOpen = navOpenRef.current;

    sidebar.classList.toggle("show");
    navClosed.classList.toggle("hidden");
    navOpen.classList.toggle("hidden");
  };


  return (
    <>
      <nav
        ref={navbarRef}
        id="navbar"
        className="sticky top-0 z-40 flex w-full flex-row justify-end bg-gray-700 px-4 sm:justify-between"
      >
        <ul className="breadcrumb hidden flex-row items-center py-4 text-lg text-white sm:flex">
          <li className="inline">
            <a href="#">MUSIC PLAYER</a>
          </li>
          <li className="inline">
            <span>Home</span>
          </li>
        </ul>
        <button
          id="btnSidebarToggler"
          type="button"
          className="py-4 text-2xl text-white hover:text-gray-200"
          onClick={toggleSidebar}
        >
          <svg
            ref={navClosedRef}
            id="navClosed"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            ref={navOpenRef}
            id="navOpen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="hidden h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      {/* Sidebar */}
      <div id="containerSidebar" className="z-40">
        <div className="navbar-menu relative z-40">
          <nav
            ref={sidebarRef}
            id="sidebar"
            className="fixed left-0 bottom-0 flex w-1/4 -translate-x-full flex-col overflow-y-auto bg-gray-700 pt-6 pb-8 sm:max-w-xs lg:w-20"
          >
            {/* Sidebar content */}
            <div className="px-4 pb-6">
              <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
                Music
              </h3>
              <ul className="mb-8 text-sm font-medium">
                <li className="flex items-center">
                  <a
                    className="active flex items-center rounded py-3 pl-2 pr-2 text-gray-50 hover:bg-gray-600"
                    href="#homepage"
                  >
                    <span className="select-none">
                      <FaRegUser size={24} title="profile" />
                    </span>
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="flex items-center rounded py-3 pl-2 pr-2 text-gray-50 hover:bg-gray-600"
                    href="#link1"
                  >
                    <span className="select-none">
                      <FaMusic size={24} title="Music" />
                    </span>
                  </a>
                </li>
                <li className="flex items-center">
                  <Link to={"/login"}
                    className="flex items-center rounded py-3 pl-2 pr-2 text-gray-50 hover:bg-gray-600"
                    href="#link1"
                  >
                    <span className="select-none">
                      <IoMdLogIn size={24} title="Login" />
                    </span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <a
                    className="flex items-center rounded py-3 pl-2 pr-2 text-gray-50 hover:bg-gray-600"
                    href="#link1"
                  >
                    <span className="select-none">
                      <IoMdLogOut size={24} title="Logout" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="mx-auto lg:ml-80"></div>
      </div>

      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow-lg rounded-lg overflow-y-auto h-[730px]">
            <DiscoverMusic onMusicSelect={setSelectedMusicId}/>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <Playing  musicId={selectedMusicId}/>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg overflow-y-auto h-[730px]">
            <TrackList onSongList = {setSelectedMusicId}/>
          </div>
        </div>
      </main>
    </>
  );
};

export default Header;
