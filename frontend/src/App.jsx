import { BrowserRouter, Routes, Route } from "react-router-dom";

//  import komponentët
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>

      {/*  Header shfaqet në çdo faqe */}
      <Header />

      {/*  përmbajtja */}
      <div className="container">

        <Routes>

          {/*  Dashboard (homepage) */}
          <Route path="/" element={<Dashboard />} />

          {/*  Login */}
          <Route path="/login" element={<Login />} />

          {/*  Register */}
          <Route path="/register" element={<Register />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;