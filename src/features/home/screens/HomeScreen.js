import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { socket } from "../../../services/socket";
import DeviceCard from "../components/DeviceCard";

// 👇 Map device IDs to tank names
const DEVICE_MAP = {
  esp_01: "Tank 1",
  esp_02: "Tank 2",
  esp_03: "Tank 3"
};

export default function HomeScreen() {
  const [devices, setDevices] = useState({});

  useEffect(() => {
    // Initial load
    socket.on("init", (initialDevices) => {
      setDevices(initialDevices);
    });

    // Live updates
    socket.on("sensor_update", (data) => {
      setDevices((prev) => ({
        ...prev,
        [data.device_id]: {
          ...prev[data.device_id],
          level: data.level,
          online: true,
        },
      }));
    });

    // Online/offline updates
    socket.on("device_status", (data) => {
      setDevices((prev) => ({
        ...prev,
        [data.device_id]: {
          ...prev[data.device_id],
          online: data.online,
        },
      }));
    });

    return () => {
      socket.off("init");
      socket.off("sensor_update");
      socket.off("device_status");
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>💧 Water Monitor</Text>

      {Object.keys(devices).length === 0 ? (
        <Text style={styles.empty}>No devices connected</Text>
      ) : (
        Object.keys(devices).map((key) => (
          <DeviceCard
            key={key}
            name={DEVICE_MAP[key] || key}
            level={devices[key]?.level || 0}
            online={devices[key]?.online ?? false}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:"center",
    marginTop:40,
    marginBottom:35
  },
  empty: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 50,
  },
});