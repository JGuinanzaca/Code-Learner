import axios from "axios";
const BASE_URL = "localhost:5000";

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

export const fetchUsers = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/codelearner/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchLessons = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/codelearner/lessons/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
