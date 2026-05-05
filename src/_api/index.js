import axios from "axios";

const URL = "http://localhost:8000";

export const API = axios.create({
  baseURL: `${URL}/api`,
});

export const STORAGE = `${URL}/storage`;
