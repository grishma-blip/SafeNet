import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  }
});

// Automatically inject JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("safenet_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (payload: any) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
  },
  register: async (payload: any) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
  },
  profile: async () => {
    const res = await api.get("/auth/profile");
    return res.data;
  }
};

export const contentAPI = {
  ingest: async (formData: FormData) => {
    // FormData requires multipart header config
    const res = await api.post("/content/ingest", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
  },
  getHistory: async () => {
    const res = await api.get("/content/history");
    return res.data;
  }
};

export const reviewAPI = {
  getPending: async () => {
    const res = await api.get("/review/pending");
    return res.data;
  },
  audit: async (contentId: string, payload: any) => {
    const res = await api.post(`/review/${contentId}/audit`, payload);
    return res.data;
  },
  getLogs: async () => {
    const res = await api.get("/review/history");
    return res.data;
  },
  getRules: async () => {
    const res = await api.get("/review/rules");
    return res.data;
  },
  createRule: async (payload: any) => {
    const res = await api.post("/review/rules", payload);
    return res.data;
  },
  deleteRule: async (ruleId: string) => {
    const res = await api.delete(`/review/rules/${ruleId}`);
    return res.data;
  },
  getStats: async () => {
    const res = await api.get("/review/stats");
    return res.data;
  }
};

export default api;
