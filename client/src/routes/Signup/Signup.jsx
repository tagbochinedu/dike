import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [details, setDetails] = React.useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const changeHandler = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("users")) {
      let users = JSON.parse(localStorage.getItem("users"));
      users = [
        ...users,
        {
          id: details.email,
          email: details.email,
          password: details.password,
          tasks: []
        },
      ];
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      const user = [
        {
          id: details.email,
          email: details.email,
          password: details.password,
          tasks: []
        },
      ];
      localStorage.setItem("users", JSON.stringify(user));
    }

    if (!localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }

    navigate("/login");
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
        <div className="mb-4 flex flex-col">
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
        <div className="mb-3 flex flex-col">
          <label
            htmlFor="password"
            className="text-gray-600 text-sm mb-2 font-semibold"
          >
            Confirm Password:
          </label>

          <input
            type="password"
            name="confirmpassword"
            onChange={(e) => {
              changeHandler(e);
            }}
            className="bg-gray-200 h-11 rounded-md outline-0 px-3 focus:border focus:border-blue-900 transition-all ease-linear duration-150"
          />
        </div>{" "}
        <div className="text-sm mb-6">
          Already have an account? Log in{" "}
          <Link to="/login" className="text-blue-800 hover:text-blue-500">
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

export default Signup;
