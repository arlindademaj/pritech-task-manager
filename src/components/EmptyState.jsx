import { StyleSheet, Text, View } from "react-native";

export default function EmptyState({ hasSearch }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {hasSearch ? "No tasks match your search." : "No tasks yet. Add one!"}
      </Text>
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
    color: "#444",
  },
});
