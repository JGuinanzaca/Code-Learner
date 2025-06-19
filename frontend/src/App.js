import { Routes, Route } from "react-router-dom";
import LessonsPage from "./pages/LessonsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lessons" element={<LessonsPage />} />
    </Routes>
  );
}

function Home() {
  return (
    <div className="App-header">
      <h1>Welcome to Code Learner</h1>
      <p>Start your coding journey with interactive lessons and feedback.</p>
      <a className="App-link" href="/lessons">Go to Lessons</a>
    </div>
  );
}

export default App;
