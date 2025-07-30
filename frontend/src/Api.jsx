import axios from "axios";
const BASE_URL = "http://localhost:5000";

export const register = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/codelearner/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
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
    throw error.response.data;
  }
};

export const fetchUsers = async (user_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/codelearner/users/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchLessons = async (lesson_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/codelearner/lessons/${lesson_id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const saveProgress = async (user_id) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/codelearner/progress/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
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
    throw error.response.data;
  }
}

export const uploadForumPost = async (forumPost) => {
  try {
    const response = await axios.post(`${BASE_URL}/codelearner/forum/post-message`,
      forumPost
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
