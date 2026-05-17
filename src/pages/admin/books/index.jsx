// src/pages/admin/books/index.jsx
import { useEffect, useState, useRef } from "react";
import { getBooks, deleteBook } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";
import { Link } from "react-router";
import { getAuthors } from "../../../_services/authors";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [booksData, genresData, authorsData] = await Promise.all([
        getBooks(),
        getGenres(),
        getAuthors(),
      ]);
      setBooks(booksData);
      setGenres(genresData);
      setAuthors(authorsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getGenreName = (id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.name : "Unknown Genre";
  };

  const getAuthorName = (id) => {
    const author = authors.find((a) => a.id === id);
    return author ? author.name : "Unknown Author";
  };

  const getImageUrl = (coverPath) => {
    if (!coverPath) return "https://via.placeholder.com/80?text=No+Image";
    if (coverPath.startsWith("http")) return coverPath;
    return `http://localhost:8000/storage/${coverPath}`;
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Hapus buku "${title}"?`)) {
      try {
        await deleteBook(id);
        setBooks(books.filter((b) => b.id !== id));
        setActiveDropdown(null);
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Gagal menghapus buku");
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getAuthorName(book.author_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getGenreName(book.genre_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Buku</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola koleksi buku perpustakaan</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-t-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari judul, penulis, atau genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            {/* Add Button */}
            <Link
              to="/admin/books/create"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Buku
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-b-xl border border-t-0 border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Cover</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Judul</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Penulis</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Genre</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Harga</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Stok</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin"></div>
                        Memuat data buku...
                      </div>
                    </td>
                  </tr>
                ) : filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                      {searchTerm ? `Tidak ditemukan buku dengan kata "${searchTerm}"` : "Belum ada data buku"}
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book, index) => (
                    <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{index + 1}</td>
                      <td className="px-4 py-3">
                        <img
                          src={getImageUrl(book.cover_photo)}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-md shadow-sm"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80?text=No+Image";
                          }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900 dark:text-white max-w-xs">
                          {book.title}
                        </div>
                       </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {getAuthorName(book.author_id)}
                       </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                          {getGenreName(book.genre_id)}
                        </span>
                       </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                        {formatPrice(book.price)}
                       </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          book.stock > 10 
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : book.stock > 0
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {book.stock} tersisa
                        </span>
                       </td>
                      <td className="px-4 py-3 text-center relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === book.id ? null : book.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        {activeDropdown === book.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 overflow-hidden">
                            <Link
                              to={`/admin/books/edit/${book.id}`}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </Link>
                            <div className="border-t border-gray-200 dark:border-gray-700"></div>
                            <button
                              onClick={() => handleDelete(book.id, book.title)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Hapus
                            </button>
                          </div>
                        )}
                       </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer Stats */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Menampilkan <span className="font-medium">{filteredBooks.length}</span> dari{" "}
                <span className="font-medium">{books.length}</span> buku
              </p>
              {searchTerm && filteredBooks.length !== books.length && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}