import { useEffect, useState } from "react";
import { getBooks } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const getImageUrl = (coverPath) => {
    if (!coverPath) return "https://via.placeholder.com/200?text=No+Image";
    if (coverPath.startsWith("http")) return coverPath;
    return `http://localhost:8000/storage/${coverPath}`;
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (selectedGenre) params.genre_id = selectedGenre;

        const booksData = await getBooks(params);
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedGenre]);

  if (loading && books.length === 0) {
    return (
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-7xl px-4 2xl:px-0">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">Loading books...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-6xl px-4 2xl:px-0">
          {/* Search and Filter Bar */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by title, author, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
              />
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            {(searchQuery || selectedGenre) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("");
                }}
                className="rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {books && books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden flex flex-col h-full"
                >
                  <div className="relative w-full aspect-3/4 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center overflow-hidden shrink-0">
                    <a
                      href={`/books/show/${book.id}`}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={getImageUrl(book.cover_photo)}
                        alt={book.title}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/200?text=No+Image";
                        }}
                      />
                    </a>
                  </div>
                  <div className="pt-4 flex flex-col grow">
                    <a
                      href={`/books/show/${book.id}`}
                      className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white line-clamp-2"
                    >
                      {book.title}
                    </a>

                    <ul className="mt-2 flex items-center gap-2 flex-wrap">
                      <li className="inline-flex items-center bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded text-xs">
                        <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
                          {book.genre?.name || "Fiction"}
                        </p>
                      </li>
                      {book.author && (
                        <li className="inline-flex items-center bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-xs">
                          <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                            by {book.author.name}
                          </p>
                        </li>
                      )}
                    </ul>

                    <p className="italic font-semibold text-gray-900 dark:text-white mt-3 mb-3">
                      Rp
                      {parseFloat(book.price).toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                      })}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <a
                        href={`/books/show/${book.id}`}
                        className="flex-1 inline-flex items-center justify-center rounded-lg bg-indigo-700 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        View
                      </a>
                      <a
                        href={`/books/show/${book.id}`}
                        className="flex-1 inline-flex items-center justify-center rounded-lg bg-indigo-700 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        Add Cart
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No books found
              </p>
            )}
          </div>
          <div className="w-full text-center">
            {/* <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Show more
            </button> */}
          </div>
        </div>
      </section>
    </>
  );
}
