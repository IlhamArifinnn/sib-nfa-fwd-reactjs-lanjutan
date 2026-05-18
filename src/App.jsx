import PublicLayout from "./layouts/Public";
import Home from "./pages/public/home";
import About from "./pages/public/about";
import Books from "./pages/public/books";
import { Route, Routes } from "react-router";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin/index";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import BookEdit from "./pages/admin/books/edit";
import AdminGenres from "./pages/admin/genres";
import CreateGenre from "./pages/admin/genres/create";
import EditGenre from "./pages/admin/genres/edit";
import AdminAuthors from "./pages/admin/authors";
import CreateAuthor from "./pages/admin/authors/create";
import EditAuthor from "./pages/admin/authors/edit";
import AdminUsers from "./pages/admin/users";
import AdminTransactions from "./pages/admin/transactions";
import ShowBook from "./pages/public/books/show";
import { ThemeProvider } from "./context/ThemeContext";
import Contact from "./pages/public/contact";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/public/cart";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Routes>
        {/* public */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />


          <Route path="books">
            <Route index element={<Books />} />
            <Route path="show/:id" element={<ShowBook />} />
          </Route>
        </Route>

        {/* auth */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* admin */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="books">
            <Route index element={<AdminBooks />} />
            <Route path="create" element={<BookCreate />} />
            <Route path="edit/:id" element={<BookEdit />} />
          </Route>

          <Route path="genres">
            <Route index element={<AdminGenres />} />
            <Route path="create" element={<CreateGenre />} />
            <Route path="edit/:id" element={<EditGenre />} />
          </Route>

          <Route path="authors">
            <Route index element={<AdminAuthors />} />
            <Route path="create" element={<CreateAuthor />} />
            <Route path="edit/:id" element={<EditAuthor />} />
          </Route>

          <Route path="users">
            <Route index element={<AdminUsers />} />
          </Route>

          <Route path="transactions">
            <Route index element={<AdminTransactions />} />
          </Route>
        </Route>
        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
