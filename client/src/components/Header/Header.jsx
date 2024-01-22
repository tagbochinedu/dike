import React from "react";
import {useNavigate} from 'react-router-dom'
import { useStateAuth } from "../../context/StateContext";

const Header = () => {
  const navigate=useNavigate()
  const { currentUser, setCurrentUser } = useStateAuth();
  const [position, setPosition] = React.useState(false);

  const logOutHandler = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser('')
    navigate('/login')
    
  };

  return (
    <div className="relative">
      <header className="bg-white sticky top-0 left-0 right-0 h-[7vh] flex justify-between items-center px-5 shadow-md">
        <h2 className="text-black font-mono font-semibold text-xl">
          Good day {currentUser.id.split("@")[0]}
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="4"
          viewBox="0 0 16 4"
          fill="none"
          onClick={() => setPosition(!position)}
          className="cursor-pointer"
        >
          <path
            d="M8 4C8.53043 4 9.03914 3.78929 9.41421 3.41421C9.78929 3.03914 10 2.53043 10 2C10 1.46957 9.78929 0.96086 9.41421 0.585787C9.03914 0.210714 8.53043 0 8 0C7.46957 0 6.96086 0.210714 6.58579 0.585787C6.21071 0.96086 6 1.46957 6 2C6 2.53043 6.21071 3.03914 6.58579 3.41421C6.96086 3.78929 7.46957 4 8 4ZM2 4C2.53043 4 3.03914 3.78929 3.41421 3.41421C3.78929 3.03914 4 2.53043 4 2C4 1.46957 3.78929 0.96086 3.41421 0.585787C3.03914 0.210714 2.53043 0 2 0C1.46957 0 0.960859 0.210714 0.585786 0.585787C0.210714 0.96086 0 1.46957 0 2C0 2.53043 0.210714 3.03914 0.585786 3.41421C0.960859 3.78929 1.46957 4 2 4ZM14 4C14.5304 4 15.0391 3.78929 15.4142 3.41421C15.7893 3.03914 16 2.53043 16 2C16 1.46957 15.7893 0.96086 15.4142 0.585787C15.0391 0.210714 14.5304 0 14 0C13.4696 0 12.9609 0.210714 12.5858 0.585787C12.2107 0.96086 12 1.46957 12 2C12 2.53043 12.2107 3.03914 12.5858 3.41421C12.9609 3.78929 13.4696 4 14 4Z"
            fill="#191B1F"
          />
        </svg>
      </header>
      <div
        className={`h-[7vh] bg-white z-10 absolute px-5 flex items-center  left-0 right-0 transition-all duration-150 ${
          position ? "top-[7vh]" : "top-[-20vh]"
        }`}
      >
        {" "}
        <button
          className={`h-[70%] my-5 text-white font-semibold w-full rounded-lg transition-all ease-linear duration-150 bg-red-500 hover:bg-red-700 active:bg-red-500`}
          onClick={logOutHandler}
        >
          Log Out
        </button>{" "}
      </div>
    </div>
  );
};

export default Header;
