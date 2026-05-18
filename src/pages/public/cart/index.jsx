import { Link } from "react-router";
import { useCart } from "../../../context/CartContext";
import { createTransaction } from "../../../_services/transactions";
import { useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalAmount = cart.reduce(
    (total, item) => total + parseFloat(item.book.price) * item.quantity,
    0,
  );

  const handleCheckoutWA = async () => {
    if (cart.length === 0) return;

    setIsCheckingOut(true);

    try {
      // Create transaction for each item in the cart
      for (const item of cart) {
        await createTransaction({
          book_id: item.book.id,
          quantity: item.quantity,
        });
      }

      const adminPhone = "6281264426162";
      let message = `Halo Admin, saya ingin memesan buku:\n\n`;

      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.book.title} (x${item.quantity}) - Rp ${(parseFloat(item.book.price) * item.quantity).toLocaleString("id-ID")}\n`;
      });

      message += `\n*Total Pembayaran: Rp ${totalAmount.toLocaleString("id-ID")}*\n\nMohon info lebih lanjut untuk pembayaran. Terima kasih.`;

      const encodedMessage = encodeURIComponent(message);
      
      // Clear cart after successful checkout
      clearCart();
      
      window.open(`https://wa.me/${adminPhone}?text=${encodedMessage}`, "_blank");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Gagal melakukan checkout. Pastikan Anda sudah login dan stok buku tersedia.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const getImageUrl = (coverPath) => {
    if (!coverPath) return "https://via.placeholder.com/150?text=No+Image";
    if (coverPath.startsWith("http")) return coverPath;
    return `http://localhost:8000/storage/${coverPath}`;
  };

  return (
    <section className="py-6 bg-white md:py-10 dark:bg-gray-900 antialiased min-h-screen">
      <div className="max-w-6xl px-4 mx-auto 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-8">
          Keranjang Belanja
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Keranjang belanja Anda masih kosong.
            </p>
            <Link
              to="/books"
              className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item) => (
                    <li
                      key={item.book.id}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
                    >
                      <div className="w-24 h-32 shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                        <img
                          src={getImageUrl(item.book.cover_photo)}
                          alt={item.book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            <Link
                              to={`/books/show/${item.book.id}`}
                              className="hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              {item.book.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Rp{" "}
                            {parseFloat(item.book.price).toLocaleString(
                              "id-ID",
                            )}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(
                                    item.book.id,
                                    item.quantity - 1,
                                  );
                                }
                              }}
                              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 font-semibold transition-colors"
                            >
                              −
                            </button>
                            <span className="w-10 text-center text-sm font-medium text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity < item.book.stock) {
                                  updateQuantity(
                                    item.book.id,
                                    item.quantity + 1,
                                  );
                                }
                              }}
                              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 font-semibold transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.book.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 text-sm font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Ringkasan Pesanan
                </h3>
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white mb-4">
                  <p>Subtotal</p>
                  <p>Rp {totalAmount.toLocaleString("id-ID")}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Pengiriman dan pajak akan dihitung pada saat konfirmasi via
                  WhatsApp.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleCheckoutWA}
                    disabled={isCheckingOut}
                    className={`w-full flex items-center justify-center gap-2 rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                      isCheckingOut
                        ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isCheckingOut ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Checkout via WhatsApp
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
