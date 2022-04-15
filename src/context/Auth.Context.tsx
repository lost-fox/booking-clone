import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: function no(token: string, id: string) {},
  logout: function no() {},
  isAuthenticated: false,
});
