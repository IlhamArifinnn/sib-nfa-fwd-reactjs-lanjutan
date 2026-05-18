export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="py-10 px-4 mx-auto max-w-6xl lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="mb-4 text-2xl font-bold tracking-tight leading-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
              Temukan dan Pinjam Buku Favorit{" "}
              <span className="text-primary-600 dark:text-primary-400">
                Secara Online
              </span>
            </h1>
            <p className="mb-6 font-normal text-gray-600 dark:text-gray-300">
              Akses ribuan koleksi buku digital kapan saja dan di mana saja.
              Pinjam buku favorit dengan mudah melalui platform perpustakaan
              modern kami.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  1000+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Koleksi Buku
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  5000+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pengguna Aktif
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  50+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Kategori
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <img
                src="./cover-hero.png"
                alt="Hero illustration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
