import React from "react";

const Header = () => {
  const [currentUser, setCurrentUser]=React.useState(JSON.parse(localStorage.getItem("currentUser")))

  return (
    <header className="bg-white sticky top-0 left-0 right-0 h-[7vh] flex justify-between items-center px-5 shadow-md">
      <h2 className="text-black font-mono font-semibold text-xl">
       Good day {currentUser.id.split('@')[0]}
      </h2>
    </header>
  );
};

export default Header;
