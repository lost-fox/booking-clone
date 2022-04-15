import { useCallback, useEffect, useState } from "react";

const storageUserName = "UserData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageUserName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageUserName);
  }, []);

  useEffect(() => {
    const getUser = localStorage.getItem(storageUserName);

    if (!getUser) return;

    const data = JSON.parse(getUser);

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
