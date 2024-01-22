import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "../Dropdown/Dropdown";
import { useStateAuth } from "../../context/StateContext";

const CreateTaskModal = () => {
  const { setCreateTask, setTasks, createTask, setCurrentUser } =
    useStateAuth();
  const [task, setTask] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    category: "",
    deadline: "",
    createdAt: Date.parse(new Date()),
    type: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    if (task.type === "Public") {
      const users = JSON.parse(localStorage.getItem("users"));
      const taskList = JSON.parse(localStorage.getItem("tasks"));
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const newTask = {
        ...task,
        description: task.description.replace(/\n/g, "<br/>"),
        numberJoined: 1,
        numberCompleted: 0,
        createdBy: currentUser.email,
      };
      currentUser.tasks.unshift(newTask);
      taskList.unshift(newTask);
      const newUsers = users.map((user) => {
        if (user.id === currentUser.id) {
          return { ...user, tasks: [newTask, ...user.tasks] };
        }
        return user;
      });

      localStorage.setItem("tasks", JSON.stringify(taskList));

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      localStorage.setItem("users", JSON.stringify(newUsers));
      setTasks(taskList);
      setCurrentUser(currentUser);
    } else if (task.type === "Private") {
      const users = JSON.parse(localStorage.getItem("users"));
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const newTask = {
        ...task,
        numberJoined: 1,
        numberCompleted: 0,
        createdBy: currentUser.email,
      };
      console.log("hello");
      currentUser.tasks.unshift(newTask);
      const newUsers = users.map((user) => {
        if (user.id === currentUser.id) {
          return { ...user, tasks: [newTask, ...user.tasks] };
        }
        return user;
      });
      console.log("hello");
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("users", JSON.stringify(newUsers));
      setCurrentUser(currentUser);
    }
    setTask({
      id: uuidv4(),
      title: "",
      description: "",
      category: "",
      deadline: "",
      createdAt: Date.parse(new Date()),
      type: "",
    });
    setCreateTask(false);
  };

  const changeHandler = (e) => {
    if (e.target.name === "deadline") {
      setTask((prev) => ({
        ...prev,
        [e.target.name]: Date.parse(new Date(e.target.value)),
      }));
    } else {
      setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className={`fixed max-w-lg mx-auto left-0 right-0  px-5 pt-10 bg-white z-10 h-screen ransition-all duration-300 overflow-y-auto ${
        createTask ? "top-0" : "-top-[200vh]"
      }`}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-blue-900 font-bold text-2xl font-sans">
          Create a New Task
        </h2>
        <span
          className="text-sm text-blue-900 cursor-pointer"
          onClick={() => setCreateTask(false)}
        >
          Cancel
        </span>
      </div>
      <div className="mb-4 flex flex-col">
        <label
          htmlFor="title"
          className="text-gray-600 text-sm mb-2 font-semibold"
        >
          Title:
        </label>
        <input
          type="text"
          name="title"
          onChange={(e) => {
            changeHandler(e);
          }}
          value={task.title}
          className="bg-gray-50 h-11 rounded-md outline-0 px-3 focus:border focus:border-blue-900 transition-all ease-linear duration-150"
        />
      </div>{" "}
      <div className="mb-4 flex flex-col relative">
        <label
          htmlFor="deadline"
          className="text-gray-600 text-sm mb-2 font-semibold"
        >
          Deadline:
        </label>
        <input
          type="date"
          name="deadline"
          onChange={(e) => {
            changeHandler(e);
          }}
          value={task.deadline}
          className="appearance-none bg-gray-50 h-11 rounded-md outline-0 px-3 focus:border focus:border-blue-900 transition-all ease-linear duration-150"
        />
      </div>{" "}
      <Dropdown
        data={["Test", "Assignment", "Practical", "Project", "Notes"]}
        label="Category"
        dataHandler={(prop) => {
          setTask((prev) => ({ ...prev, category: prop }));
        }}
      />
      <Dropdown
        data={["Public", "Private"]}
        label="Type"
        dataHandler={(prop) => {
          setTask((prev) => ({ ...prev, type: prop }));
        }}
      />
      <div className="mb-4 flex flex-col relative">
        <label
          htmlFor="description"
          className="text-gray-600 text-sm mb-2 font-semibold"
        >
          Description:
        </label>
        <textarea
          name="description"
          className="bg-gray-50 w-full px-3 pt-3 focus:border rounded-md focus:outline-none focus:border-blue-900 resize-none"
          placeholder="Hey, what's going on?"
          rows={5}
          autoCorrect="off"
          onChange={(e) =>
            setTask((prev) => ({ ...prev, description: e.target.value }))
          }
          value={task.description}
        />{" "}
      </div>{" "}
      <button
        type="submit"
        className="bg-[#062863] h-11 text-white font-semibold w-full rounded-lg hover:bg-[#2957a7]  active:bg-[#062863] transition-all ease-linear duration-150"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateTaskModal;
