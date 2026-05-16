import { useEffect, useState } from "react";
import { getTransactions } from "../../../_services/transactions";
import { getBooks } from "../../../_services/books";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [transactionsData, booksData] = await Promise.all([
        getTransactions(),
        getBooks(),
      ]);
      setTransactions(transactionsData);
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal mengambil data transaksi");
    } finally {
      setLoading(false);
    }
  };

  const getBookTitle = (id) => {
    const book = books.find((b) => b.id === id);
    return book ? book.title : "Unknown Book";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Transaction Management
              </h1>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
              <button
                onClick={fetchData}
                className="flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    #
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Order Number
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Book
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Total Amount
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Customer ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-3 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-3">{index + 1}</td>{" "}
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {transaction.order_number}
                      </th>
                      <td className="px-4 py-3">
                        {getBookTitle(transaction.book_id)}
                      </td>
                      <td className="px-4 py-3">{transaction.quantity}</td>
                      <td className="px-4 py-3">
                        {formatPrice(transaction.total_amount)}
                      </td>
                      <td className="px-4 py-3">{transaction.user_id}</td>
                      <td className="px-4 py-3">
                        {formatDate(transaction.created_at)}
                      </td>
                      <td className="px-4 py-3 flex items-center justify-end relative">
                        <button
                          id={`dropdown-button-${transaction.id}`}
                          data-dropdown-toggle={`dropdown-${transaction.id}`}
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="button"
                          onClick={() => toggleDropdown(transaction.id)}
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>

                        {openDropdownId === transaction.id && (
                          <div
                            id="transaction-dropdown"
                            className="absolute right-0 mt-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            style={{ top: "100%", right: "0" }}
                          >
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby={`dropdown-button-${transaction.id}`}
                            >
                              <li>
                                <button
                                  onClick={() => {
                                    console.log("View details:", transaction);
                                    toggleDropdown(null);
                                  }}
                                  className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  View Details
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-3 text-center">
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
