import React from "react";

export default function Reset() {
    return (
    <div className = 'custom-main'>
      <h2>Reset Your Password</h2>
      <label>New Password:</label>
      <input
        type="password"
        placeholder="••••••••"
      />
      <button>Reset Password</button>
    </div>
  );
}