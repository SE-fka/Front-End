import axios from "axios";

const API_URL = "http://172.20.102.64:3001/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('token', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  signup(username, email, password) {
    return axios
      .post(API_URL + "signup", {
        username,
        email, 
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('token', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('token'));
  }
  language() {
    window.location.reload();
  }
}
export default new AuthService();