import "./App.css";
import { useState } from "react";
import LessonsPage from "./pages/LessonsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <img src="/logo.png" alt="Code Learner Logo" style={{ width: "100px", marginBottom: "10px" }} />
      <h1>Code Learner</h1>
      <div className="card">
        {user ? (
          <>
            <p>Welcome, {user}!</p>
            <LessonsPage />
          </>
        ) : (
          <LoginPage onLogin={setUser} />
        )}
      </div>
    </div>
  );
}

export default App;
