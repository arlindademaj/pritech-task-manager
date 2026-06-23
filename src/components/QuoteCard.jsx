import { StyleSheet, Text, View } from "react-native";

const ACCENT = "#a3e635";

export default function QuoteCard({ quote }) {
  if (!quote) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>"{quote.quote}"</Text>
      <Text style={styles.author}>— {quote.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: ACCENT,
  },
  text: {
    fontSize: 13,
    color: "#888",
    fontStyle: "italic",
    lineHeight: 20,
    marginBottom: 6,
  },
  author: {
    fontSize: 12,
    color: ACCENT,
    fontWeight: "600",
  },
});
