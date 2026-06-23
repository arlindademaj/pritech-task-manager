import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTasks } from "../context/TaskContext";

const ACCENT = "#a3e635";

export default function AddTaskScreen({ navigation }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title.");
      return;
    }
    try {
      await addTask(title, description);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>New Task</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title..."
        placeholderTextColor="#444"
        value={title}
        onChangeText={setTitle}
        keyboardAppearance="dark"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter task description..."
        placeholderTextColor="#444"
        value={description}
        onChangeText={setDescription}
        multiline
        keyboardAppearance="dark"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    marginBottom: 32,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    color: "#fff",
    marginBottom: 20,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: ACCENT,
    borderRadius: 18,
    padding: 17,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#0d0d0d",
    fontSize: 15,
    fontWeight: "700",
  },
});
