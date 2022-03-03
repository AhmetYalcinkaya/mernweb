import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Service from "./components/Service";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import { useState } from "react";
// import ProtectedRoute from "./ProtectedRoute";

function App() {
  //check if user is loged in
  const [auth, setAuth] = useState(false);
  const [auth1, setAuth1] = useState(true);

  const isLoggedIn = async () => {
    try {
      const res = await fetch("/auth", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        setAuth(true);
        setAuth1(false);
      }
      if (res.status === 400) {
        setAuth(false);
        setAuth1(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar auth={auth1} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/service" element={<Service />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} auth={auth1} />
        <Route exact path="/register" element={<Register />} auth={auth1} />
        <Route exact path="/dashboard" element={<Dashboard />} auth={auth} />
        <Route exact path="/logout" element={<Logout />} auth={auth} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
