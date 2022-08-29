import axios from "axios";


const API_URL = "http://localhost:8080/api/";



const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

export const getToken =() =>{
  return localStorage.getItem("token");
}
export const isTokenExpired =(token) => {
  if(!token) return false
  let token1 = JSON.stringify(token);
  const expiry = (JSON.parse(atob(token1.split('.')[1]))).exp;
  console.log("expired: " + (Math.floor((new Date).getTime() / 1000)) >= expiry)
  return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}


const login = (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  axios.post(API_URL+ "login", params).then((response) => {
      console.log(response);
      console.log(response.data);
      localStorage.setItem("token", response.data["access_token"].replace(/[\"]+/g,''));
      // console.log(isTokenExpired(token));

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
