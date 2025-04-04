import axios from "axios";

const API_KEY = "AIzaSyBbawJ4zpW9AZ9VMNExawsTqwj2jbR7y5Q";

const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const {
    idToken: token,
  } = response.data;

  return token;
};

export const createUser = (email, password) => {
  return authenticate("signUp", email, password);
};

export const login = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};