import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useStateAuth } from "../../context/StateContext";
import CreateTaskModal from "../Modals/CreateTaskModal";
import DisplayTaskModal from "../Modals/DisplayTaskModal";

const Layout = ({ children }) => {
  const { createTask, setCreateTask } = useStateAuth();
  return (
    <div className="pb-40">
      <Header />
      <div className="fixed bottom-20 px-5 left-0 right-0 max-w-lg mx-auto z-10 flex justify-end">
       
      </div>
      <CreateTaskModal />
      <DisplayTaskModal />
      <div className="h-full p-5 ">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
