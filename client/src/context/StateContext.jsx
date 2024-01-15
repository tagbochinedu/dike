import React, { useState, useContext } from "react";

const StateContext = React.createContext();

export function useStateAuth() {
  return useContext(StateContext);
}

export const StateProvider = ({ children }) => {
  const [taskId, setTaskId] = useState("");
  const [openTask, setOpenTask] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
      ? JSON.parse(localStorage.getItem("currentUser"))
      : {}
  );

  const value = {
    createTask,
    setCreateTask,
    tasks,
    setTasks,
    openTask,
    setOpenTask,
    taskId,
    setTaskId,
    currentUser,
    setCurrentUser,
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
