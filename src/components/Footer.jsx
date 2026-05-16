import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="px-4 py-12 mx-auto max-w-6xl lg:px-6 ">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="" className="w-8 h-8" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  PinBooks
                </span>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Platform digital modern untuk akses buku kapan saja, di mana
                saja.
              </p>
            </div>

            {/* Tautan Cepat */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Tautan Cepat
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tentang"
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                  >
                    Tentang
                  </Link>
                </li>
                <li>
                  <Link
                    to="/books"
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                  >
                    Koleksi Buku
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kebijakan */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Kebijakan
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                  >
                    Privasi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                  >
                    Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                  >
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hubungi Kami */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Hubungi Kami
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex gap-2">
                  <Mail /> info@pinbooks.com
                </li>
                <li className="flex gap-2">
                  <Phone /> +62 812 3456 7890
                </li>
                <li className="flex gap-2">
                  <MapPin /> Jakarta, Indonesia
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2026 PinBooks. Hak cipta dilindungi. Semua hak yang terkait di
                dalamnya bersifat intelektual.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                >
                  Kebijakan Privasi
                </Link>
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                >
                  Syarat Penggunaan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
