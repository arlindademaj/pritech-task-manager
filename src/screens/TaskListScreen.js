import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "../components/EmptyState";
import QuoteCard from "../components/QuoteCard";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

const ACCENT = "#a3e635";

export default function TaskListScreen({ navigation }) {
  const { tasks, toggleTask } = useTasks();
  const [search, setSearch] = useState("");
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/quotes/random")
      .then((res) => res.json())
      .then(setQuote)
      .catch(() => setQuote(null));
  }, []);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [tasks, search],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TaskCard
        task={item}
        onPress={() => navigation.navigate("TaskDetail", { taskId: item.id })}
        onToggle={() => toggleTask(item.id)}
      />
    ),
    [toggleTask, navigation],
  );

  return (
    <View style={s.container}>
      <Text style={s.greeting}>Created by Arlind Ademaj</Text>
      <Text style={s.heading}>My Tasks</Text>

      <TextInput
        style={s.search}
        placeholder="Search tasks..."
        placeholderTextColor="#444"
        value={search}
        onChangeText={setSearch}
        clearButtonMode="while-editing"
        keyboardAppearance="dark"
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(task) => String(task.id)}
        contentContainerStyle={s.list}
        ListEmptyComponent={<EmptyState hasSearch={search.length > 0} />}
        renderItem={renderItem}
      />

      <QuoteCard quote={quote} />

      <TouchableOpacity
        style={s.fab}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={s.fabText}>+ New Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    padding: 24,
    paddingTop: 60,
    paddingBottom: 0,
  },
  greeting: {
    fontSize: 12,
    color: "#444",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  search: {
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    padding: 12,
    fontSize: 14,
    color: "#fff",
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#2a2a2a",
  },
  list: {
    paddingBottom: 16,
  },
  fab: {
    backgroundColor: ACCENT,
    borderRadius: 18,
    padding: 17,
    alignItems: "center",
    marginBottom: 24,
  },
  fabText: {
    color: "#0d0d0d",
    fontSize: 15,
    fontWeight: "700",
  },
});
