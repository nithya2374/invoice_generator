import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);


   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    } else {
      refresh(); // fallback if no data in localStorage
    }
  }, []);

  const login = async (data) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, data);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.accessToken);
    return res;
  };

  const signup = async (data) => {
    const res = await axios.post(`${API_URL}/api/auth/signup`, data);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.accessToken);
  };

  const logout = async () => {
    await axios.post(`${API_URL}/api/auth/logout`);
    setUser(null);
    setAccessToken("");
    
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const refresh = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/refresh-token`,{ withCredentials: true });
      setAccessToken(res.data.accessToken);
      localStorage.setItem("token", res.data.accessToken);

    } catch (err) {
      setUser(null);
      setAccessToken("");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    if (!accessToken) return; // Prevent calling without token
    try {
      const res = await axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "no-cache", 
        },
        withCredentials: true,
      });
      console.log("user data: ",res.data);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.log("Not logged in");
      setUser(null); 
      localStorage.removeItem("user");
    }
  };

 //  Only call refresh on mount
useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    refresh(); // Only call refresh if token exists
  } else {
    setLoading(false); // Stop loading if no token
  }
}, []);

//  Wait for accessToken to exist before calling getMe
useEffect(() => {
  if (accessToken) {
    getMe();
  }
}, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
