# Task Manager App

A simple and clean task manager built with React Native and Expo.

---

## About

This app allows users to manage their daily tasks. It includes a task list with real-time search, the ability to add new tasks, view task details, mark tasks as complete, and delete them. A random motivational quote is fetched from a public API and displayed on the home screen.

---

## Features

- View all tasks in a clean list
- Search tasks by title in real time
- Add new tasks with title and description
- View task details
- Mark tasks as complete / not completed
- Delete a task from the detail screen
- Empty state handling when no tasks are found
- Tasks are saved on the device and persist between sessions
- Random motivational quote fetched from a public API

---

## Tech Stack

- React Native (JavaScript)
- Expo SDK 54
- React Context API for state management
- AsyncStorage for local persistence
- React Navigation for screen navigation
- React hooks: `useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`

---

## Project Structure

```
src/
├── components/
│   ├── EmptyState.jsx
│   ├── QuoteCard.jsx
│   └── TaskCard.jsx
├── context/
│   └── TaskContext.js
├── hooks/
│   └── useTasks.js
├── screens/
│   ├── AddTaskScreen.jsx
│   ├── TaskDetailScreen.jsx
│   └── TaskListScreen.jsx
└── utils/
    └── storage.js
```

---

## Prerequisites

- Node.js installed on your machine
- Expo CLI: `npm install -g expo-cli`
- Expo Go app installed on your phone (iOS or Android)

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/arlindademaj/pritech-task-manager.git
   cd pritech-task-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the app**

   ```bash
   npx expo start
   ```

4. **Run on device or simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with the Expo Go app on your phone

---

## What Was Implemented

- **Task list screen** — displays all tasks with real-time search by title and an empty state when no results are found
- **Add task screen** — form to create a new task with title and description, includes basic input validation
- **Task detail screen** — shows full task info with options to toggle status and delete the task
- **TaskCard** — reusable component for rendering each task in the list
- **QuoteCard** — reusable component that displays a motivational quote fetched from a public API
- **EmptyState** — handles both empty list and no search results scenarios
- **TaskContext** — global state management using React Context API, handles adding, toggling, and deleting tasks
- **Local storage** — tasks are persisted on the device using AsyncStorage so they survive app restarts

---

## Task Data Structure

| Field        | Description                                |
| ------------ | ------------------------------------------ |
| Title        | Task title entered by the user             |
| Description  | Short task description entered by the user |
| Status       | Completed or pending                       |
| Created date | Date when the task was created             |
