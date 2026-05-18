import { Link, useNavigate } from "react-router";
import { logout } from "../_services/auth";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const handleLogout = async () => {
    if (token) {
      await logout({ token });
      localStorage.removeItem("userInfo");
    }
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <nav className="px-4 lg:px-6 py-3">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-6xl">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
                PinBooks
              </span>
            </Link>

            {/* Right Section */}
            <div className="flex items-center lg:order-2 gap-2">
              {token && userInfo ? (
                <>
                  <Link to="/cart" className="relative p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors mr-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <div className="hidden sm:flex items-center gap-2 mr-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {userInfo.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 transition"
                  >
                    Daftar
                  </Link>
                </>
              )}

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  {mobileMenuOpen ? (
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Navigation Menu */}
            <div
              className={`${
                mobileMenuOpen ? "block" : "hidden"
              } justify-between items-center w-full lg:flex lg:w-auto lg:order-1 transition-all`}
              id="mobile-menu"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-gray-700  hover:bg-gray-50 lg:hover:bg-transparent  lg:hover:text-indigo-600 lg:p-0 dark:text-gray-400 dark:hover:bg-transparent  transition"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tentang"
                    className="block py-2 pr-4 pl-3 text-gray-700  hover:bg-gray-50 lg:hover:bg-transparent  lg:hover:text-indigo-600 lg:p-0 dark:text-gray-400 dark:hover:bg-transparent  transition"
                  >
                    Tentang
                  </Link>
                </li>
                <li>
                  <Link
                    to="/books"
                    className="block py-2 pr-4 pl-3 text-gray-700  hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-indigo-600 lg:p-0 dark:text-gray-400 dark:hover:bg-transparent  transition"
                  >
                    Koleksi Buku
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kontak"
                    className="block py-2 pr-4 pl-3 text-gray-700  hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-indigo-600 lg:p-0 dark:text-gray-400 dark:hover:bg-transparent  transition"
                  >
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
