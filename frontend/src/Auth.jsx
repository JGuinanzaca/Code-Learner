import axios from "axios";
const BASE_URL = "http://localhost:5000";

export const signUp = async (userData) => {
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
