import React, { useState, useEffect } from 'react';

function ProfilePage({ userId = 'default-user' }) {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // If you're storing avatar URLs in a database, fetch them here
    // For now, assume no avatar yet
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch(`/api/profile/${userId}/avatar`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setAvatarUrl(data.avatarUrl);
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile Page</h1>
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" style={{ width: '150px', borderRadius: '50%' }} />
      ) : (
        <p>No avatar uploaded.</p>
      )}
      <form onSubmit={handleUpload} style={{ marginTop: '1rem' }}>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Upload Avatar</button>
      </form>
    </div>
  );
}

export default ProfilePage;
