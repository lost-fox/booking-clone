import "./App.css";
import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SettingsContainer } from "./context/StoreContext";
import { useRouter } from "./helpers/routes";
import { useAuth } from "./hooks/auth.hooks";
import { AuthContext } from "./context/Auth.Context";

const App = () => {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRouter(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      <SettingsContainer>
        <Header />
        <Routes>
          {routes.map(({ path, ...props }, index) => (
            <Route path={path} key={index} {...props}></Route>
          ))}
        </Routes>
        <Footer />
      </SettingsContainer>
    </AuthContext.Provider>
  );
};
export default App;
