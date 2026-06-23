import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TaskProvider } from "./src/context/TaskContext";
import AddTaskScreen from "./src/screens/AddTaskScreen";
import TaskDetailScreen from "./src/screens/TaskDetailScreen";
import TaskListScreen from "./src/screens/TaskListScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
          <Stack.Navigator>
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TaskDetail"
              component={TaskDetailScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </GestureHandlerRootView>
  );
}
