import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTasks } from "../context/TaskContext";
import colors from "../utils/colors";

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

  const badgeStyle = isDone ? styles.badgeDone : styles.badgePending;
  const badgeTextStyle = isDone
    ? styles.badgeTextDone
    : styles.badgeTextPending;
  const badgeLabel = isDone ? "Completed" : "Pending";

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

      <View style={[styles.badge, badgeStyle]}>
        <Text style={[styles.badgeText, badgeTextStyle]}>{badgeLabel}</Text>
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
    backgroundColor: colors.background,
    padding: 24,
    paddingTop: 60,
  },
  back: {
    marginBottom: 24,
  },
  backText: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: "500",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
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
    backgroundColor: colors.card,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  badgeTextPending: {
    color: colors.accent,
  },
  badgeTextDone: {
    color: colors.textMuted,
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
    backgroundColor: colors.accent,
    borderRadius: 18,
    padding: 17,
    alignItems: "center",
    marginBottom: 12,
  },
  toggleButtonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: colors.card,
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
