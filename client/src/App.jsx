import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";
import Profile from "./routes/Profile/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
]);

export default function App() {
  return (
    <section className="max-w-lg mx-auto relative">
      <div className=" h-screen border-x overflow-y-auto  ">
        <RouterProvider router={router} />
      </div>
    </section>
  );
}
