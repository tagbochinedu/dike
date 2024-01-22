import test from "../../assets/test.jpg";
import notes from "../../assets/notes.jpg";
import project from "../../assets/project.jpg";
import practical from "../../assets/practical.png";
import React, { useEffect, useState } from "react";
import assignment from "../../assets/assignment.jpg";
import { useStateAuth } from "../../context/StateContext";

const DisplayTaskModal = () => {
  const {
    openTask,
    taskId,
    setOpenTask,
    tasks,
    currentUser,
    setTasks,
    setCurrentUser,
  } = useStateAuth();
  const [task, setTask] = useState();
  const [timeProgress, setTimeProgress] = useState();
  const joined = currentUser.tasks?.find(
    (usertask) => usertask?.id === task?.id
  );

  useEffect(() => {
    if (taskId) {
      const displayedTask = tasks.filter((task) => task.id === taskId)[0];
      if (displayedTask) {
        setTask(displayedTask);
      } else {
        const privateTask = currentUser.tasks.filter(
          (task) => task.id === taskId
        )[0];
        setTask(privateTask);
      }
    }
  }, [taskId]);

  useEffect(() => {
    setTimeProgress(
      ((Date.parse(new Date()) - task?.createdAt) /
        (task?.deadline - task?.createdAt)) *
        100
    );
  }, [task]);

  const buttonHandler = () => {
    if (joined) {
      //updating tasks
      if (task?.type === "Public") {
        const updatedTasks = tasks.map((task) => {
          if (task?.id === taskId) {
            return { ...task, numberCompleted: task?.numberCompleted + 1 };
          }
          return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
      //updating currentUser
      const updatedUserTasks = currentUser.tasks.map((task) => {
        if (task?.id === taskId) {
          return {
            ...task,
            status: "Completed",
            numberCompleted: task?.numberCompleted + 1,
          };
        }
        return task;
      });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...currentUser,
          tasks: updatedUserTasks,
        })
      );
      setCurrentUser((prev) => ({ ...prev, tasks: updatedUserTasks }));
      //updating users Array
      const allUsers = JSON.parse(localStorage.getItem("users"));
      const creator = allUsers.find((user) => user.email === task.createdBy);
      const updatedCreatorTasks = creator.tasks.map((task) => {
        if (task?.id === taskId && task?.createdBy === currentUser?.email) {
          return {
            ...task,
            numberCompleted: task?.numberCompleted + 1,
            status: "Completed",
          };
        } else if (
          task?.id === taskId &&
          task?.createdBy !== currentUser?.email
        ) {
          return {
            ...task,
            numberCompleted: task?.numberCompleted + 1,
          };
        }
        return task;
      });
      const creatorUpdated = { ...creator, tasks: updatedCreatorTasks };
      const allUsers2 = allUsers.map((user) => {
        if (user.email === creator.email) {
          return creatorUpdated;
        }
        return user
      });
      localStorage.setItem(
        "users",
        JSON.stringify(
          allUsers2,
        )
      );
    } else {
      //updating all tasks
      const updatedTasks = tasks.map((task) => {
        if (task?.id === taskId) {
          return { ...task, numberJoined: task?.numberJoined + 1 };
        }
        return task;
      });
      setTasks(updatedTasks);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setCurrentUser((prev) => ({
        ...prev,
        tasks: [
          { ...task, numberJoined: task?.numberJoined + 1 },
          ...currentUser?.tasks,
        ],
      }));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...currentUser,
          tasks: [
            { ...task, numberJoined: task?.numberJoined + 1 },
            ...currentUser?.tasks,
          ],
        })
      );

      //updating users Array
      const allUsers = JSON.parse(localStorage.getItem("users"));
      const creator = allUsers.find((user) => user.email === task?.createdBy);
      const updatedCreatorTasks = creator.tasks.map((task) => {
        if (task?.id === taskId) {
          return {
            ...task,
            numberJoined: task?.numberJoined + 1,
          };
        }
        return task;
      });
      const creatorUpdated = { ...creator, tasks: updatedCreatorTasks };
      const allUsers2 = allUsers.map((user) => {
        if (user.email === creator?.email) {
          return creatorUpdated;
        }
        return {
          ...user,
          tasks: [
            {
              ...task,
              numberJoined: task?.numberJoined + 1,
            },
            ...user?.tasks,
          ],
        };
      });
      localStorage.setItem("users", JSON.stringify(allUsers2));
    }
  };

  return (
    <div
      className={`fixed max-w-lg mx-auto left-0 right-0 pt-10 bg-white z-10 h-screen transition-all duration-300 overflow-y-auto ${
        openTask ? "top-0" : "top-[200vh]"
      }`}
    >
      {" "}
      <div className="">
        <button
          onClick={() => {
            setOpenTask(false);
          }}
          className="float-end px-5"
        >
          Close
        </button>
        <div className="">
          <img
            src={
              task?.category === "Assignment"
                ? assignment
                : task?.category === "Test"
                ? test
                : task?.category === "Project"
                ? project
                : task?.category === "Practical"
                ? practical
                : notes
            }
            alt=""
            className="w-full object-cover"
          />
          <div className="p-5">
            <h2 className="text-2xl font-semibold">{task?.title}</h2>
            <div className="">
              <p className="text-lg">
                {" "}
                <span className="text-gray-600 text-sm mb-2 font-semibold">
                  Category:
                </span>{" "}
                {task?.category}
              </p>

              <p className="text-base">
                {" "}
                <span className="text-gray-600 text-sm mb-2 font-semibold">
                  Due On:
                </span>{" "}
                {new Date(task?.deadline).toLocaleString().split(",")[0]}
              </p>

              <div className="flex items-center">
                {" "}
                {new Date(task?.createdAt).toLocaleString().split(",")[0]}{" "}
                <div
                  className="w-full h-3 bg-blue-700 rounded-full border border-[#f0f2f5] mx-2"
                  style={{
                    backgroundImage: `linear-gradient(to right, #1d4ed8 0%, #1d4ed8 ${timeProgress}%, #f0f2f5 ${timeProgress}%, #f0f2f5 100%)`,
                  }}
                />
                {new Date(task?.deadline).toLocaleString().split(",")[0]}
              </div>
            </div>
            <button
              className={`h-7 my-5 text-white font-semibold w-full rounded-lg transition-all ease-linear duration-150 ${
                !joined?.status
                  ? "bg-[#062863]  hover:bg-[#2957a7]  active:bg-[#062863]"
                  : "bg-gray-600"
              }`}
              onClick={buttonHandler}
            >
              {joined && !joined?.status
                ? "Mark Completed"
                : !joined
                ? "Join"
                : joined?.status
                ? "Completed"
                : ""}
            </button>
            <div className="">
              <span className="text-gray-600 text-sm mb-2 font-semibold">
                Description:
              </span>
              <p
                className="break-words"
                dangerouslySetInnerHTML={{
                  __html: task?.description,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTaskModal;
