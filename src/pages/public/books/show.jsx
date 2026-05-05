import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { showBook } from "../../../_services/books";
import { STORAGE } from "../../../_api";

export default function ShowBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const bookData = await showBook(id);
        setBook(bookData);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-7xl px-4 mx-auto 2xl:px-0">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading book details...
          </p>
        </div>
      </section>
    );
  }

  if (error || !book) {
    return (
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-7xl px-4 mx-auto 2xl:px-0">
          <div className="text-center">
            <p className="text-red-500 dark:text-red-400 mb-4">
              {error || "Book not found"}
            </p>
            <button
              onClick={() => navigate("/books")}
              className="inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800"
            >
              Back to Books
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-7xl px-4 mx-auto 2xl:px-0">
          <button
            onClick={() => navigate("/books")}
            className="mb-6 text-indigo-700 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Books
          </button>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              {book.image_url ? (
                <img
                  className="w-full rounded-lg"
                  src={`${STORAGE}/${book.image_url}`}
                  alt={book.title}
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No image available
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {book.title}
              </h1>

              <div className="mt-2">
                {book.genre && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Genre:</span>{" "}
                    {book.genre.name}
                  </p>
                )}
                {book.author && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Author:</span>{" "}
                    {book.author.name}
                  </p>
                )}
              </div>

              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  ${parseFloat(book.price).toFixed(2)}
                </p>

                {book.stock !== undefined && (
                  <p
                    className={`text-sm font-medium ${
                      book.stock > 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
                  </p>
                )}
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <button
                  type="button"
                  disabled={book.stock === 0}
                  className={`text-white mt-4 sm:mt-0 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center transition ${
                    book.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  }`}
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Description
                </h2>
                <p className="text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
                  {book.description || "No description available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
