import { StyleSheet, Text, View } from "react-native";
import colors from "../utils/colors";

export default function EmptyState({ hasSearch }) {
  let message = "";

  if (hasSearch) {
    message = "No tasks match your search.";
  } else {
    message = "No tasks yet. Add one!";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: colors.textMuted,
  },
});
