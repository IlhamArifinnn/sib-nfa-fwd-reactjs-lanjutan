// src/pages/admin/transactions/index.jsx
import { useEffect, useState } from "react";
import { getTransactions } from "../../../_services/transactions";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeDetail, setActiveDetail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const transactionsData = await getTransactions();
      console.log("Transactions data:", transactionsData); // Untuk debugging
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal mengambil data transaksi");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.order_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.book?.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.customer?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manajemen Transaksi
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Kelola data peminjaman buku
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header with search and refresh */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Cari order number, judul buku, atau nama customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={fetchData}
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Order Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Buku
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Jumlah
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin"></div>
                        Memuat data...
                      </div>
                    </td>
                  </tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      {searchTerm
                        ? `Tidak ditemukan transaksi dengan "${searchTerm}"`
                        : "Belum ada data transaksi"}
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-4 py-4 text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-mono text-xs font-medium text-gray-900 dark:text-white">
                          {transaction.order_number}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {transaction.customer?.name ||
                              `User #${transaction.customer_id}`}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {transaction.customer?.email || "-"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                        {transaction.book?.title || "Unknown Book"}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center text-slate-800 dark:text-gray-200 justify-center min-w-8 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded">
                          {transaction.quantity}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-gray-900 dark:text-white">
                        {formatPrice(transaction.total_amount)}
                      </td>
                      <td className="px-4 py-4 text-gray-500 dark:text-gray-400 text-xs">
                        {formatDate(transaction.created_at)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() =>
                            setActiveDetail(
                              activeDetail === transaction.id
                                ? null
                                : transaction.id,
                            )
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Detail
                        </button>

                        {/* Detail Modal/Popup */}
                        {activeDetail === transaction.id && (
                          <div
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                            onClick={() => setActiveDetail(null)}
                          >
                            <div
                              className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full mx-4 shadow-xl"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Detail Transaksi
                                </h3>
                                <button
                                  onClick={() => setActiveDetail(null)}
                                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
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
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="p-4 space-y-3">
                                {/* Customer Info Section */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-2">
                                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                      />
                                    </svg>
                                    Informasi Customer
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400">
                                        Nama
                                      </span>
                                      <span className="font-medium text-gray-900 dark:text-white">
                                        {transaction.customer?.name ||
                                          `User #${transaction.customer_id}`}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400">
                                        Email
                                      </span>
                                      <span className="text-gray-900 dark:text-white">
                                        {transaction.customer?.email || "-"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400">
                                        User ID
                                      </span>
                                      <span className="font-mono text-xs text-gray-900 dark:text-white">
                                        #{transaction.customer_id}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Book Info Section */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-2">
                                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
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
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                      />
                                    </svg>
                                    Informasi Buku
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400">
                                        Judul Buku
                                      </span>
                                      <span className="text-gray-900 dark:text-white">
                                        {transaction.book?.title ||
                                          "Unknown Book"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400">
                                        Penulis
                                      </span>
                                      <span className="text-gray-900 dark:text-white">
                                        {transaction.book?.author?.name || "-"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Transaction Info Section */}
                                <div className="space-y-2">
                                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400">
                                      Order Number
                                    </span>
                                    <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                                      {transaction.order_number}
                                    </span>
                                  </div>
                                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400">
                                      Quantity
                                    </span>
                                    <span className="text-gray-900 dark:text-white">
                                      {transaction.quantity}
                                    </span>
                                  </div>
                                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400">
                                      Harga Satuan
                                    </span>
                                    <span className="text-gray-900 dark:text-white">
                                      {formatPrice(
                                        transaction.total_amount /
                                          transaction.quantity,
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400">
                                      Total Harga
                                    </span>
                                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                                      {formatPrice(transaction.total_amount)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between py-2">
                                    <span className="text-gray-500 dark:text-gray-400">
                                      Tanggal Transaksi
                                    </span>
                                    <span className="text-gray-900 dark:text-white text-sm">
                                      {formatDate(transaction.created_at)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                  onClick={() => setActiveDetail(null)}
                                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                                >
                                  Tutup
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Menampilkan{" "}
                <span className="font-medium">
                  {filteredTransactions.length}
                </span>{" "}
                dari <span className="font-medium">{transactions.length}</span>{" "}
                transaksi
              </p>
              {searchTerm &&
                filteredTransactions.length !== transactions.length && (
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
