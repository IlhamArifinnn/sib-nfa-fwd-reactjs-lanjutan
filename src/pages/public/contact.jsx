// src/pages/public/contact.jsx
import {
  Mail,
  Phone,
  Clock,
  User,
  AtSign,
  FileText,
  MessageSquare,
  Send,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      value: "info@pinbooks.com",
      description: "Untuk pertanyaan umum dan dukungan teknis",
    },
    {
      icon: Phone,
      title: "Telepon",
      value: "+62 812 3456 7890",
      description: "Senin - Jumat, 08.00 - 16.00 WIB",
    },
    {
      icon: MapPin,
      title: "Alamat",
      value: "Jakarta, Indonesia",
      description: "Kunjungi kantor kami",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header Section */}
      <section className="pt-8 lg:pt-12 px-4 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-4">
            Hubungi Kami
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Kami Siap{" "}
            <span className="text-primary-600 dark:text-primary-400">
              Membantu Anda
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Memiliki pertanyaan atau saran? Kami akan dengan senang hati
            mendengarkan. Hubungi kami melalui formulir di bawah.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-10 lg:py-18 px-4 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Card */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Kirim Pesan
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Isi formulir di bawah dan kami akan merespons secepatnya.
              </p>
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl">
                <p className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  ✓ Terima kasih! Pesan Anda telah berhasil dikirim.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AtSign className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Subjek
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FileText className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Subjek pesan Anda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Pesan
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <MessageSquare className="w-5 h-5" />
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Informasi Kontak
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Atau hubungi kami langsung melalui informasi di bawah ini.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="flex gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 transition-all hover:shadow-md"
                >
                  <div className="w-11 h-11 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {info.title}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-1">
                      {info.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Office Hours */}
              <div className="flex gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="w-11 h-11 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Jam Operasional
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                    Senin - Jumat
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    08.00 - 16.00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 lg:py-18 px-4 mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-4">
            Lokasi Kami
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Temukan Kami
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Kunjungi kantor kami di lokasi berikut
          </p>
        </div>
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.4913678674!2d106.6643624741619!3d-6.229720822497146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1778940992475!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="PinBooks Location Map"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
