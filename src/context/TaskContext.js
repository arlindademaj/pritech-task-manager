import { createContext, useContext, useEffect, useState } from "react";
import { getTasks, saveTasks } from "../utils/storage";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Load tasks when app opens
  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const addTask = async (title, description) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const toggleTask = async (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        if (task.status === "completed") {
          return { ...task, status: "pending" };
        } else {
          return { ...task, status: "completed" };
        }
      }
      return task;
    });
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
