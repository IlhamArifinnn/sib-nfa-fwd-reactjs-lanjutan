import { useEffect, useState, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { logout, useDecodeToken } from "../_services/auth";
import ThemeToggle from "../components/ThemeToggle";
import {
  UserRound,
  Menu,
  Search,
  BarChart3,
  Users,
  BookOpen,
  Tag,
  BookMarked,
  ShoppingCart,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const decodedData = useDecodeToken(token);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!token || !decodedData || !decodedData.success) {
      navigate("/login");
    }

    if (!userInfo) {
      navigate("/login");
      return;
    }

    const role = userInfo.role;
    if (!role || role !== "admin") {
      navigate("/");
    }
  }, [token, decodedData, userInfo, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (token) {
        await logout({ token });
        localStorage.removeItem("userInfo");
      }
    } finally {
      navigate("/login");
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button
                data-drawer-target="drawer-navigation"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <Menu size={24} />
                <span className="sr-only">Toggle sidebar</span>
              </button>
              <Link
                to="/admin"
                className="flex items-center justify-between mr-4"
              >
                <img src="/logo.png" className="mr-3 h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-800 dark:text-white">
                  PinBooks
                </span>
              </Link>
            </div>
            <div className="flex items-center lg:order-2">
              <ThemeToggle />

              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center p-2 text-sm mx-2 bg-gray-100 dark:bg-gray-600 text-slate-700 dark:text-gray-300 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 "
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
              >
                <span className="sr-only">Open user menu</span>
                <UserRound size={24} className="" />
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-16 right-4 z-50 w-56 text-base list-none bg-white rounded-lg divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600"
                  role="menu"
                >
                  <div className="py-3 px-4">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                      {userInfo?.name}
                    </span>
                    <span className="block text-sm text-gray-600 truncate dark:text-gray-300">
                      {userInfo?.email}
                    </span>
                  </div>
                  <ul
                    className="py-2 text-gray-700 dark:text-gray-300"
                    role="menu"
                  >
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        disabled={isLoggingOut}
                        className={`text-left gap-2 py-2 px-4 text-sm w-full flex items-center p-2 font-medium text-gray-900 rounded-lg transition duration-75 group ${
                          isLoggingOut
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-red-100 dark:hover:bg-red-500 dark:text-white"
                        }`}
                        role="menuitem"
                      >
                        <LogOut size={16} />
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* <!-- Sidebar --> */}

        <aside
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <BarChart3
                    size={24}
                    className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="ml-3">Overview</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <Users
                    size={24}
                    className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="ml-3">Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/authors"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <BookOpen
                    size={24}
                    className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="ml-3">Authors</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/genres"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <Tag
                    size={24}
                    className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="ml-3">Genres</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/books"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <BookMarked
                    size={24}
                    className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="ml-3">Books</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/transactions"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <ShoppingCart
                    size={24}
                    className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="ml-3">Transaction</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <HelpCircle
                    size={24}
                    className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="ml-3">Help</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`w-full flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 group ${
                    isLoggingOut
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-100 dark:hover:bg-red-500 dark:text-white"
                  }`}
                >
                  <LogOut
                    size={24}
                    className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="ml-3">{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <main className="p-4 md:ml-64 h-auto pt-20">
          <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-auto px-4 pt-4 pb-6">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
