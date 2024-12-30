import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import { UserDataContext } from "./context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Note from "./pages/Note";
import { ApiClient } from "./lib/ApiClient";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { USER_INFO_ROUTE } from "./lib/constant";
import Navbar from "./components/navbar";
import NewNote from "./pages/NewNote";
import Loading from "./components/Loading";
import Error404 from "./components/Error404";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(UserDataContext);
  // console.log(`Private Routes : ${user} and authentication ${!user}`);
  return user && Object.keys(user).length > 0 ? children : <Navigate to="/auth/login" />;
};

const AuthRoutes = ({ children }) => {
  const { user } = useContext(UserDataContext);
  // console.log(`Auth Routes : ${user} and authentication ${!user}`);
  return user && Object.keys(user).length > 0 ? <Navigate to="/" /> : children;
};

const LayoutWithNavBar = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <LayoutWithNavBar>
          <Home />
        </LayoutWithNavBar>
      </PrivateRoutes>
    ),
  },
  {
    path: "/auth/login",
    element: (
      <AuthRoutes>
        <Login />
      </AuthRoutes>
    ),
  },
  {
    path: "/auth/signup",
    element: (
      <AuthRoutes>
        <Signup />
      </AuthRoutes>
    ),
  },
  {
    path: "/notes/:noteId",
    element: (
      <PrivateRoutes>
        <LayoutWithNavBar>
          <Note />
        </LayoutWithNavBar>
      </PrivateRoutes>
    ),
  },
  {
    path: "/new-note",
    element: (
      <PrivateRoutes>
        <LayoutWithNavBar>
          <NewNote />
        </LayoutWithNavBar>
      </PrivateRoutes>
    ),
  },
  {
    path: "*",
    element: <Error404 />
  }
]);

function App() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserDataContext);

  // Getting userinfo from the server with the help of browser cookies if user is not present in the contextApi and setting it to the Zustand store for global accessibility.
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await ApiClient.get(USER_INFO_ROUTE);
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          setUser(response.data.user);
        }
      } catch (err) {
        console.log(err);
        setUser("");
      } finally {
        setLoading(false);
      }
    };
    if (!user || Object.keys(user).length === 0) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
