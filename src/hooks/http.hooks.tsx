import { useState, useCallback } from "react";

enum Method {
  Get = "GET",
  Post = "POST",
  Patch = "PATCH",
}

export const useHttp = () => {
  const [loading, setLoad] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url: string, method = Method, body = null, headers = {}) => {
      setLoad(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const responce = await fetch(url, { method, body, headers });
        const data = await responce.json();
        if (!responce.ok) {
          throw new Error(data.message || "Unknown error in hook -> request()");
        }
        setLoad(false);
        return data;
      } catch (error: any) {
        setLoad(false);
        throw new Error(error.message);
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
};
