import "./App.css";
import { useState } from "react";
import LessonsPage from "./pages/LessonsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <h1>Code Learner</h1>
      {user ? (
        <>
          <p>Welcome, {user}!</p>
          <LessonsPage />
        </>
      ) : (
        <LoginPage onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
