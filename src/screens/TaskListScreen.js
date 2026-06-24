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
import colors from "../utils/colors";

export default function TaskListScreen({ navigation }) {
  const { tasks, toggleTask } = useTasks();
  const [search, setSearch] = useState("");
  const [quote, setQuote] = useState(null);

  // Fetch a random quote when the screen loads
  useEffect(() => {
    fetch("https://dummyjson.com/quotes/random")
      .then((res) => res.json())
      .then(setQuote)
      .catch(() => setQuote(null));
  }, []);

  // Filter tasks based on search input
  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [tasks, search],
  );

  // Render each task card
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
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.greeting}>Created by Arlind Ademaj</Text>
      <Text style={styles.heading}>My Tasks</Text>

      {/* Search bar */}
      <TextInput
        style={styles.search}
        placeholder="Search tasks..."
        placeholderTextColor={colors.textMuted}
        value={search}
        onChangeText={setSearch}
        clearButtonMode="while-editing"
        keyboardAppearance="dark"
      />

      {/* Task list */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(task) => String(task.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState hasSearch={search.length > 0} />}
        renderItem={renderItem}
      />

      {/* Random quote */}
      <QuoteCard quote={quote} />

      {/* Add task button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.fabText}>+ New Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    paddingTop: 60,
    paddingBottom: 0,
  },
  greeting: {
    fontSize: 12,
    color: colors.textMuted,
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
  },
  search: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  list: {
    paddingBottom: 16,
  },
  fab: {
    backgroundColor: colors.accent,
    borderRadius: 18,
    padding: 17,
    alignItems: "center",
    marginBottom: 24,
  },
  fabText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "700",
  },
});
