import axios from "axios";

const api = axios.create({
  //baseURL: "https://localhost:5001/api", // your ChefBot API
  baseURL: "https://03353736e7bd.ngrok-free.app/api",
  headers: { "Content-Type": "application/json",  "ngrok-skip-browser-warning": "true" },
  
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const registerUser = async (email: string, password: string) => {
  return api.post("/auth/register", { email, password });
};

export const loginUser = async (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

export const getRecipes = async () => {
  return api.get("/recipes"); // endpoint we'll mock in backend
};

export const askAi = async (question: string): Promise<string> => {
  const res = await api.post("/ai/ask", question, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const addAllergy = async (allergy: string): Promise<string> => {
  try {
    const response = await api.post("/ai/allergies", `"${allergy}"`);
    return response.data; // this will be the updated allergy object or list
  } catch (error: any) {
    console.error("Error adding allergy:", error.response || error);
    throw error;
  }
};
// enpoint to get attributes and pass to front end and endpoint to update/delete