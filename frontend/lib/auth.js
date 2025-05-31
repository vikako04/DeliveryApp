import axios from "./api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const login = async (email, password) => {
  const res = await axios.post("/auth/login", { email, password });
  Cookies.set("token", res.data.token);
  window.location.href = "/";
};

export const register = async (name, email, password) => {
  const res = await axios.post("/auth/register", { name, email, password });
  Cookies.set("token", res.data.token);
};

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    axios
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return { user, loading };
}
