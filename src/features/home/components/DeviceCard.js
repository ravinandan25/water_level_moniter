import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DeviceCard({ name, level, online }) {
  const getColor = () => {
    if (!online) return "#6b7280";
    if (level > 70) return "#22c55e";
    if (level > 30) return "#facc15";
    return "#ef4444";
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={{ color: online ? "#22c55e" : "#ef4444" }}>
          {online ? "🟢 Online" : "🔴 Offline"}
        </Text>
      </View>

      <Text style={[styles.level, { color: getColor() }]}>
        {online ? `${level}%` : "--"}
      </Text>

      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            {
              width: online ? `${level}%` : "0%",
              backgroundColor: getColor(),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "bold",
  },
  level: {
    fontSize: 28,
    marginTop: 10,
    fontWeight: "bold",
  },
  barContainer: {
    height: 10,
    backgroundColor: "#334155",
    borderRadius: 5,
    marginTop: 10,
  },
  bar: {
    height: 10,
    borderRadius: 5,
  },
});