import { useState } from "react";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In to Start Learning</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <button type="submit">Start Learning</button>
    </form>
  );
}

export default LoginPage;
