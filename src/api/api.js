import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-filmes-c22e.onrender.com/"
});