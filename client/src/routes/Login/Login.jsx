import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateAuth } from "../../context/StateContext";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useStateAuth();
  const [details, setDetails] = React.useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));

    const user = users.filter((user) => user.id === details.email);
    if (user && user[0].password === details.password) {
      localStorage.setItem("currentUser", JSON.stringify(user[0]));
      setCurrentUser(user[0]);
      navigate("/");
    } else if (!user) {
      alert("user does not exist");
    } else if (user && user[0].password !== details.password) {
      alert("password is incorrect");
      console.log(user[0].password, details.password, user);
    }
  };

  return (
    <section className="bg-[#062863] h-full flex items-center">
      <form
        onSubmit={submitHandler}
        className="bg-white w-11/12 mx-auto rounded-t-2xl rounded-br-2xl py-10 px-5"
      >
        <h2 className="text-blue-900 font-bold text-center text-2xl font-sans">
          Login To Your Account
        </h2>
        <div className="mb-4 flex flex-col">
          <label
            htmlFor="email"
            className="text-gray-600 text-sm mb-2 font-semibold"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              changeHandler(e);
            }}
            className="bg-gray-200 h-11 rounded-md outline-0 px-3 focus:border focus:border-blue-900 transition-all ease-linear duration-150"
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label
            htmlFor="password"
            className="text-gray-600 text-sm mb-2 font-semibold"
          >
            Password:
          </label>

          <input
            type="password"
            name="password"
            onChange={(e) => {
              changeHandler(e);
            }}
            className="bg-gray-200 h-11 rounded-md outline-0 px-3 focus:border focus:border-blue-900 transition-all ease-linear duration-150"
          />
        </div>
        <div className="text-sm mb-6">
          Don't have an account? Sign up{" "}
          <Link to="/signup" className="text-blue-800 hover:text-blue-500">
            here
          </Link>
        </div>
        <button
          type="submit"
          className="bg-[#062863] h-11 text-white font-semibold w-full rounded-lg hover:bg-[#2957a7]  active:bg-[#062863] transition-all ease-linear duration-150"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Login;
