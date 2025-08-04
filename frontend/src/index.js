import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider, useTheme } from "./pages/ThemeProvider.jsx";

import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import Header from "./pages/Header.jsx";
import Footer from "./pages/Footer.jsx";
import HomePage from "./App.jsx";
import Forums from "./pages/Forums.jsx";
import Code from "./pages/Practice.jsx";
import Docs from "./pages/Docs.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUp from "./pages/Signup.jsx";
import Sitemap from "./pages/Sitemap.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Reset from "./pages/ResetPage.jsx";

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
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={
            <div className="custom-container"> 
              <div className="custom-main" style={{marginTop: "15%"}}>
                <h1 className="custom-title" style={{color: "var(--accent)"}}>404</h1>
                <h1 className="custom-title">Page Not Found</h1>
              </div>
            </div>
            } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
