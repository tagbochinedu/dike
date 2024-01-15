import test from "../../assets/test.jpg";
import React, { useState } from "react";
import notes from "../../assets/notes.jpg";
import project from "../../assets/project.jpg";
import practical from "../../assets/practical.png";
import Layout from "../../components/Layout/Layout";
import assignment from "../../assets/assignment.jpg";
import { useStateAuth } from "../../context/StateContext";

const Home = () => {
  const { tasks, setOpenTask, setTaskId } = useStateAuth();
  return (
    <Layout>
      {tasks.length > 0 ? (
        <>
          {tasks
            .filter((task) => task?.status !== "Completed")
            .map((task, index) => {
              let progress = (task.numberCompleted / task.numberJoined) * 100;
              return (
                <div
                  className="rounded-xl mb-10 pb-10 shadow-md"
                  key={index}
                  onClick={() => {
                    setOpenTask(true);
                    setTaskId(task.id);
                  }}
                >
                  <div className="rounded-t-xl">
                    <img
                      src={
                        task.category === "Assignment"
                          ? assignment
                          : task.category === "Test"
                          ? test
                          : task.category === "Project"
                          ? project
                          : task.category === "Practical"
                          ? practical
                          : notes
                      }
                      alt=""
                      className="w-full h-40 rounded-t-xl object-cover"
                    />
                  </div>
                  <div className="px-5">
                    <h5 className="font-semibold text-lg font-mono">
                      {task.title.charAt(0).toUpperCase() +
                        task.title.substring(1)}
                    </h5>
                    <p className=""></p>
                    <p>{}</p>
                    <p>Members: {task.numberJoined}</p>
                    <div className="flex items-center">
                      <div
                        className="w-full h-3 bg-blue-700 rounded-full border border-[#f0f2f5] mr-2"
                        style={{
                          backgroundImage: `linear-gradient(to right, #1d4ed8 0%, #1d4ed8 ${progress}%, #f0f2f5 ${progress}%, #f0f2f5 100%)`,
                        }}
                      />
                      {progress.toFixed(0)}%
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <>No tasks have been created</>
      )}
    </Layout>
  );
};

export default Home;
