import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTasks } from "../context/TaskContext";

const ACCENT = "#a3e635";

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params;
  const { tasks, toggleTask, deleteTask } = useTasks();
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Task not found.</Text>
      </View>
    );
  }

  const isDone = task.status === "completed";

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>{task.title}</Text>
      <Text style={styles.date}>
        Created {new Date(task.createdAt).toLocaleDateString()}
      </Text>

      <View
        style={[styles.badge, isDone ? styles.badgeDone : styles.badgePending]}
      >
        <Text
          style={[
            styles.badgeText,
            isDone ? styles.badgeTextDone : styles.badgeTextPending,
          ]}
        >
          {isDone ? "Completed" : "Pending"}
        </Text>
      </View>

      <Text style={styles.label}>Description</Text>
      <Text style={styles.description}>
        {task.description || "No description provided."}
      </Text>

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => toggleTask(task.id)}
      >
        <Text style={styles.toggleButtonText}>
          {isDone ? "Mark as Pending" : "Mark as Completed"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    padding: 24,
    paddingTop: 60,
  },
  back: {
    marginBottom: 24,
  },
  backText: {
    color: ACCENT,
    fontSize: 15,
    fontWeight: "500",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 32,
  },
  badgePending: {
    backgroundColor: "#1a2a1a",
  },
  badgeDone: {
    backgroundColor: "#1f1f1f",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  badgeTextPending: {
    color: ACCENT,
  },
  badgeTextDone: {
    color: "#444",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 40,
    lineHeight: 24,
  },
  toggleButton: {
    backgroundColor: ACCENT,
    borderRadius: 18,
    padding: 17,
    alignItems: "center",
    marginBottom: 12,
  },
  toggleButtonText: {
    color: "#0d0d0d",
    fontSize: 15,
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: "#1a1a1a",
    borderRadius: 18,
    padding: 17,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#ef4444",
    fontSize: 15,
    fontWeight: "700",
  },
  notFound: {
    color: "#555",
    fontSize: 15,
  },
});
