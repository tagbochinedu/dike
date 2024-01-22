import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";
import Profile from "./routes/Profile/Profile";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useStateAuth } from "./context/StateContext";

export default function App() {
  const { currentUser } = useStateAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: currentUser ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: !currentUser ? <Login /> : <Navigate to="/" />,
    },
    {
      path: "/signup",
      element: !currentUser ? <Signup /> : <Navigate to="/" />,
    },
    {
      path: "/profile",
      element: currentUser ? <Profile /> : <Navigate to="/login" />,
    },
  ]);
  return (
    <section className="max-w-lg mx-auto relative">
      <div className=" h-screen border-x overflow-y-auto  ">
        <RouterProvider router={router} />
      </div>
    </section>
  );
}
