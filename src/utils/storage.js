let memoryStore = [];

export const getTasks = async () => {
  return memoryStore;
};

export const saveTasks = async (tasks) => {
  memoryStore = tasks;
};
