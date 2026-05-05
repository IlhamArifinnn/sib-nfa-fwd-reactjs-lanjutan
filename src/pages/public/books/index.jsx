import { useEffect, useState } from "react";
import { getBooks } from "../../../_services/books";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
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
        <div className="mx-auto max-w-7xl px-4 2xl:px-0">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {books && books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="h-56 w-full bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <a href={`/books/show/${book.id}`}>
                      {book.image_url ? (
                        <img
                          className="mx-auto h-full object-cover rounded"
                          src={book.image_url}
                          alt={book.title}
                        />
                      ) : (
                        <div className="text-gray-400 dark:text-gray-500 text-center">
                          <p className="text-sm">No Image</p>
                        </div>
                      )}
                    </a>
                  </div>
                  <div className="pt-6">
                    <a
                      href={`/books/show/${book.id}`}
                      className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                    >
                      {book.title}
                    </a>

                    <ul className="mt-2 flex items-center gap-2">
                      <li className="inline-flex items-center bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">
                        <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
                          {book.genre?.name || "Fiction"}
                        </p>
                      </li>
                      {book.author && (
                        <li className="inline-flex items-center bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                          <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                            by {book.author.name}
                          </p>
                        </li>
                      )}
                    </ul>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                        Rp{parseFloat(book.price).toFixed(2)}
                      </p>

                      <a
                        href={`/books/show/${book.id}`}
                        className="inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4  focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        View Details
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
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Show more
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
