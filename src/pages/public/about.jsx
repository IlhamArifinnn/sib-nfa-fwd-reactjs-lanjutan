// src/pages/public/about.jsx
import {
  BookText,
  Lightbulb,
  LockKeyhole,
  MessageCircleCheck,
} from "lucide-react";
import { Link } from "react-router";

const About = () => {
  const features = [
    {
      icon: <BookText className="text-slate-800 dark:text-gray-400" />,
      title: "Koleksi Lengkap",
      description:
        "Ribuan buku dari berbagai genre tersedia untuk Anda pinjam kapan saja",
    },
    {
      icon: (
        <MessageCircleCheck className="text-slate-800 dark:text-gray-400" />
      ),
      title: "Akses Cepat",
      description:
        "Pinjam dan baca buku instan tanpa harus datang ke perpustakaan",
    },
    {
      icon: <LockKeyhole className="text-slate-800 dark:text-gray-400" />,
      title: "Aman & Terpercaya",
      description: "Data Anda terlindungi dengan sistem keamanan terbaik",
    },
    {
      icon: <Lightbulb className="text-slate-800 dark:text-gray-400" />,
      title: "Rekomendasi Pintar",
      description: "Dapatkan rekomendasi buku berdasarkan minat baca Anda",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Vision & Mission Section */}
      <section className="pt-10 lg:pt-18 px-4 mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-4">
              Visi & Misi
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Mewujudkan{" "}
              <span className="text-primary-600 dark:text-primary-400">
                Budaya Membaca <br />
              </span>{" "}
              Digital di Indonesia
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Visi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Menjadi platform digital yang menghubungkan pembaca dengan
                    pengetahuan tanpa batas, serta mendorong minat baca
                    masyarakat Indonesia di era digital.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Misi
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                    <li>
                      • Menyediakan akses mudah ke koleksi buku berkualitas
                    </li>
                    <li>
                      • Mengembangkan teknologi ramah pengguna untuk pengalaman
                      membaca
                    </li>
                    <li>
                      • Memberdayakan penerbit dan penulis melalui platform
                      digital
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <img src="/cover-hero.png" alt="" className="rounded" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 lg:py-18 px-4 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-4">
            Kenapa Kami?
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Keunggulan{" "}
            <span className="text-primary-600 dark:text-primary-400">
              Layanan Kami
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Nikmati pengalaman membaca yang berbeda dengan berbagai fitur
            unggulan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-linear-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 lg:py-18 px-4 mx-auto max-w-6xl">
        <div className="bg-linear-to-r from-primary-600/80 to-primary-800/80 dark:from-primary-800/80 dark:to-primary-900/80 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Siap Memulai Perjalanan Membaca Anda?
          </h2>
          <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pembaca lain dan nikmati akses tak
            terbatas ke koleksi buku digital kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-103"
            >
              Daftar Sekarang
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
            <Link
              to="/books"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              Jelajahi Koleksi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
