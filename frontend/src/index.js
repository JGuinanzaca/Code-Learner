import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider, useTheme } from "./pages/ThemeProvider.jsx";

import { Provider } from "react-redux";
import store from "./redux/store";

import Header from "./pages/Header.jsx";
import Footer from "./pages/Footer.jsx";
import HomePage from "./App.jsx";
import Forums from "./pages/Forums.jsx";
import Code from "./pages/Practice.jsx";
import Docs from "./pages/Docs.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUp from "./pages/Signup.jsx";

function App() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme !== "dark";

  return (
    <>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/code" element={<Code />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
