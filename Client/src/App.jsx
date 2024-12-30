import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { UserDataContext } from "./context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Note from "./pages/Note";
import { ApiClient } from "./lib/ApiClient";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(UserDataContext);
  const { email, userName } = user;
  const isAunthenicated = !!email && !!userName; // if both is present in the context then user is authenticated.
  return isAunthenicated ? children : <Navigate to="/auth/login" />;
};

const AuthRoutes = ({ children }) => {
  const { user } = useContext(UserDataContext);
  const { email, userName } = user;
  const isAunthenicated = !!email && !!userName; // if both is present in the context then user is authenticated.
  return isAunthenicated ? <Navigate to="/" /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <Home />
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
        <Note />
      </PrivateRoutes>
    ),
  },
]);

// Without Route Validations

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element: <Home/>
//   },
//   {
//     path:"/auth/login",
//     element: <Login/>
//   },
//   {
//     path:"/auth/signup",
//     element: <Signup/>
//   },
//   {
//     path:"/notes/:noteId",
//     element:<Note />
//   }
// ]);

function App() {
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(UserDataContext);
  const { email, userName } = user;

  // Getting userinfo from the server with the help of browser cookies if user is not present in the contextApi and setting it to the Zustand store for global accessibility.
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await ApiClient.get("/user/user-info", {
          withCredentials: true,
        });
        console.log(response);
        if (response.status === 200) {
          console.log(response);
        }
      } catch (err) {
        console.log(err);
        setUser({
          email: "",
          userName: "",
        });
      } finally {
        setLoading(false);
      }
    };
    if (email != "" && userName != "") {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
