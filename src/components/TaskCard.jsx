import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";

export default function TaskCard({ task, onPress, onToggle }) {
  const isDone = task.status === "completed";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.dot, isDone && styles.dotDone]} />

      <View style={styles.body}>
        <Text
          style={[styles.title, isDone && styles.titleDone]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text style={styles.description} numberOfLines={1}>
            {task.description}
          </Text>
        ) : null}
      </View>

      <View style={styles.right}>
        <TouchableOpacity
          style={[styles.tag, isDone && styles.tagDone]}
          onPress={onToggle}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.tagText, isDone && styles.tagTextDone]}>
            {isDone ? "Done" : "Pending"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.date}>
          {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
    flexShrink: 0,
  },
  dotDone: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#333",
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: colors.textMuted,
  },
  description: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  right: {
    alignItems: "center",
    gap: 4,
  },
  date: {
    fontSize: 11,
    color: colors.textMuted,
  },
  tag: {
    backgroundColor: "#1a2a1a",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagDone: {
    backgroundColor: colors.card,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.accent,
  },
  tagTextDone: {
    color: colors.textMuted,
  },
});
