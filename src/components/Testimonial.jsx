export default function Testimonial() {
  const testimonials = [
    {
      name: "Micheal Gough",
      role: "CEO at Google",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
      text: "Platform perpustakaan digital ini sangat memudahkan saya menemukan buku-buku terbaru. Antarmuka yang user-friendly membuat pengalaman membaca semakin menyenangkan.",
    },
    {
      name: "Jisoo Park",
      role: "Founder at TechStart",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
      text: "Koleksi bukunya sangat lengkap dan berkualitas. Sistem peminjaman yang fleksibel membuat saya bisa membaca kapan saja sesuai jadwal saya.",
    },
    {
      name: "Leslie Alexander",
      role: "Author & Writer",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/leslie-livingstone.png",
      text: "Sebagai seorang penulis, saya sangat menghargai koleksi literatur yang ada di sini. Rekomendasi buku mereka sangat akurat dan membantu memperluas wawasan saya.",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-16 lg:py-24">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Apa Kata Pengguna Kami
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ribuan pengguna puas telah mempercayai platform kami untuk
              kebutuhan literatur digital mereka
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition p-6"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <svg
                    className="h-8 text-gray-400 dark:text-gray-500"
                    viewBox="0 0 24 27"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>

                {/* Text */}
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
