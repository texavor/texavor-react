import axios from "axios";
import { toast } from "sonner";

export const baseURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://easywrite.onrender.com";

// export const baseURL = "https://easywrite.onrender.com";

export const axiosInstance = axios.create({
  baseURL,
  // timeout: 30000,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("access_expires_at");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    } else {
      // Display toast for other errors
      // toast("Error", {
      //   description: response?.data?.errors || "Error occurred",
      // });
      const flattenErrors = (errors: any) => {
        if (!errors) return null;
        return Object.keys(errors)
          .map((key) => {
            const messages = errors[key];
            if (Array.isArray(messages)) {
              return `${key.charAt(0).toUpperCase() + key.slice(1)} ${messages.join(", ")}`;
            }
            return null;
          })
          .filter(Boolean)
          .join("; ");
      };
      toast.error(
        response?.data?.message ||
          flattenErrors(response?.data) ||
          "Error occurred",
      );
    }
    return Promise.reject(error);
  },
);
