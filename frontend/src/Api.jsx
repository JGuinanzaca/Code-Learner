import axios from "axios";
const BASE_URL = "https://code-learner-deploy.onrender.com";
//const BASE_URL = "http://localhost:5000";

// All errors are displayed in the console in the backend 

export const register = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/codelearner/register`,
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/codelearner/login`,
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchUsers = async (user_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/codelearner/users/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw "Issue fetching user";
  }
};

export const fetchLessons = async (lesson_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/codelearner/lessons/${lesson_id}`
    );
    return response.data;
  } catch (error) {
    throw "Issue fetching lesson";
  }
};

export const saveProgress = async (userId, lessonData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/codelearner/progress/${userId}`, 
      lessonData
    );
    return response.data;
  } catch (error) {
    throw "issue saving progress of the user";
  }
};

export const generateURL = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/codelearner/profile-image/url`,
    formData
  );
  return response.data;
};

export const uploadURL = async (user_id, url) => {
  const response = await axios.put(
    `${BASE_URL}/codelearner/profile-image/upload/${user_id}`,
    url
  );
  return response.data;
};

export const fetchForumPost = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/codelearner/forum/messages`);
    return response.data;
  } catch (error) {
    throw "Issue fetching all forum post";
  }
}

export const fetchRepliesFromPost = async (forum_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/codelearner/forum/replies/${forum_id}`);
    return response.data;
  } catch (error) {
    throw "Issue fetching all replies from forum post";
  }
}

export const uploadForumPost = async (forumPost) => {
  try {
    const response = await axios.post(`${BASE_URL}/codelearner/forum/post-message`,
      forumPost
    );
    return response.data;
  } catch (error) {
    throw "Issue uploading forum post";
  }
}

export const replyToForumPost = async (forum_id, forumPost) => {
  try {
    const response = await axios.put(`${BASE_URL}/codelearner/forum/reply-to-message/${forum_id}`,
      forumPost
    );
    return response.data;
  } catch (error) {
    throw "Issue uploading reply to forum post";
  }
}

export const sendResetEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/codelearner/reset/forgot-password`,
      email
    );
    return response.data;
  } catch (error) {
    return response.data;
  }
}

export const resetPassword = async (user_id, newPassword) => {
  try {
    const response = await axios.put(`${BASE_URL}/codelearner/reset/reset-password/${user_id}`, 
      newPassword
    );
    return response.data;
  } catch (error) {
    throw "Issue resetting user's password in the database";
  }
}
