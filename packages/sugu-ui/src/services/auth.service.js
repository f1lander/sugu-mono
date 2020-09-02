import axios from "axios";

const API_URL = "https://app.chekku.site/api/";

const register = (username, email, password) => {
  return axios.post(`${API_URL}/user/register`, {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(`${API_URL}/auth/login`, {
      username,
      password,
    })
    .then((response) => {
      debugger;
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};