// src/components/FeaturedBooks.jsx
import { Link } from "react-router";

export default function FeaturedBooks() {
  const books = [
    {
      id: 1,
      title: "Design Systems Modern",
      author: "Sudi Siswanto",
      category: "Teknologi",
      rating: 4.8,
      cover: "from-teal-500 to-teal-700",
      price: "Rp 89.000",
    },
    {
      id: 2,
      title: "Strategi Startup di Era Digital",
      author: "Arina Wijaya",
      category: "Bisnis",
      rating: 4.9,
      cover: "from-indigo-500 to-indigo-700",
      price: "Rp 95.000",
    },
    {
      id: 3,
      title: "Langit di Balik Jendela",
      author: "Rola Prasana",
      category: "Novel",
      rating: 4.7,
      cover: "from-rose-400 to-rose-600",
      price: "Rp 79.000",
    },
    {
      id: 4,
      title: "Metodologi Riset Terapan",
      author: "Prof. D. Supriyanto",
      category: "Pendidikan",
      rating: 4.5,
      cover: "from-green-500 to-green-700",
      price: "Rp 120.000",
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
          {rating}
        </span>
      </div>
    );
  };

  return (
    <section className="py-16 px-4 mx-auto max-w-6xl lg:py-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Buku Populer
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Koleksi buku yang paling sering dipinjam minggu ini
          </p>
        </div>
        <Link
          to="/books"
          className="hidden md:inline-block text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold text-sm transition-colors"
        >
          Lihat Semua →
        </Link>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div
                className={`w-full h-64 bg-gradient-to-br ${book.cover} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-105">
                    Lihat Detail
                  </button>
                </div>
                {/* Book icon placeholder */}
                <svg
                  className="w-20 h-20 text-white/20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16v12H4z" />
                  <path
                    d="M8 4v16M16 4v16"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase mb-1">
                {book.category}
              </p>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {book.author}
              </p>

              <div className="flex items-center justify-between">
                {renderStars(book.rating)}
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                  {book.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View Link */}
      <div className="md:hidden mt-8 text-center">
        <Link
          to="/books"
          className="inline-block text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors"
        >
          Lihat Semua Buku →
        </Link>
      </div>
    </section>
  );
}
