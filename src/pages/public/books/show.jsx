import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { showBook } from "../../../_services/books";
import { createTransaction } from "../../../_services/transactions";

export default function ShowBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: null, text: "" });

  const accessToken = localStorage.getItem("accessToken");

  const getImageUrl = (coverPath) => {
    if (!coverPath) return "https://via.placeholder.com/300?text=No+Image";
    if (coverPath.startsWith("http")) return coverPath;
    return `http://localhost:8000/storage/${coverPath}`;
  };

  const handleIncrement = () => {
    if (quantity < book.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: null, text: "" });

    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        book_id: id,
        quantity: parseInt(quantity),
      };
      await createTransaction(payload);
      setSubmitMessage({
        type: "success",
        text: "✓ Pembelian berhasil! Terima kasih sudah berbelanja.",
      });
      setQuantity(1);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error creating transaction:", error);
      setSubmitMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "✗ Gagal membuat transaksi. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="relative w-full aspect-[3/4] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  src={getImageUrl(book.cover_photo)}
                  alt={book.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300?text=No+Image";
                  }}
                />
              </div>
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
                  Rp
                  {parseFloat(book.price).toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                  })}
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

              <div className="mt-6 sm:mt-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitMessage.text && (
                    <div
                      className={`p-4 rounded-lg border-l-4 ${
                        submitMessage.type === "success"
                          ? "bg-green-50 border-green-400 dark:bg-green-900/20 dark:border-green-500"
                          : "bg-red-50 border-red-400 dark:bg-red-900/20 dark:border-red-500"
                      }`}
                    >
                      <p
                        className={`text-sm font-medium ${
                          submitMessage.type === "success"
                            ? "text-green-800 dark:text-green-200"
                            : "text-red-800 dark:text-red-200"
                        }`}
                      >
                        {submitMessage.text}
                      </p>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Jumlah Pembelian
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={handleDecrement}
                          disabled={
                            quantity <= 1 || book.stock === 0 || isSubmitting
                          }
                          className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 font-semibold transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          min="1"
                          max={book.stock}
                          value={quantity}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "") {
                              setQuantity("");
                            } else {
                              const num = parseInt(val);
                              if (
                                !isNaN(num) &&
                                num >= 1 &&
                                num <= book.stock
                              ) {
                                setQuantity(num);
                              }
                            }
                          }}
                          onBlur={(e) => {
                            if (
                              e.target.value === "" ||
                              parseInt(e.target.value) < 1
                            ) {
                              setQuantity(1);
                            }
                          }}
                          className="w-16 px-2 py-2 text-center text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-0 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-semibold"
                          disabled={book.stock === 0 || isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={handleIncrement}
                          disabled={
                            quantity >= book.stock ||
                            book.stock === 0 ||
                            isSubmitting
                          }
                          className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 font-semibold transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Stok tersedia:{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {book.stock}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 dark:text-gray-300">
                          Harga satuan:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${parseFloat(book.price).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Total:
                        </span>
                        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                          ${(parseFloat(book.price) * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={book.stock === 0 || isSubmitting}
                    className={`w-full sm:w-auto font-semibold rounded-lg text-sm px-8 py-3 flex items-center justify-center gap-2 transition-all duration-200 ${
                      book.stock === 0 || isSubmitting
                        ? "bg-gray-400 cursor-not-allowed text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg active:scale-95 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Beli Sekarang
                      </>
                    )}
                  </button>
                </form>
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
