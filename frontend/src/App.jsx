import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//  PAGES
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

//  KOMPONENTË
import Header from "./components/Header";
import NoteList from "./components/NoteList"; 

//  TOAST
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>

      {/*  HEADER */}
      <Header />

      {/*  ROUTES */}
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*  NEW ROUTE (SI PROFESORI) */}
        <Route path="/allnotes" element={<NoteList />} />

      </Routes>

      {/*  TOAST */}
      <ToastContainer />

    </Router>
  );
}

export default App;