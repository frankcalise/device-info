import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DeviceInfo from "react-native-device-info";

export default function HomeScreen() {
  const checkLowEndDevice = async () => {
    const totalRAM = await DeviceInfo.getTotalMemory(); // in bytes
    const cpuCores = DeviceInfo.getApiLevelSync();

    const isLowEnd = totalRAM < 2 * 1024 * 1024 * 1024 || cpuCores < 4; // Less than 2GB RAM or <4 cores
    return isLowEnd;
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Device Info</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">API Level | System Version</ThemedText>
        <ThemedText>
          {DeviceInfo.getApiLevelSync()} | {DeviceInfo.getSystemVersion()}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Total Memory</ThemedText>
        <ThemedText>
          {Math.round(DeviceInfo.getTotalMemorySync() / 1024 / 1024 / 1024)} GB
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Battery Level</ThemedText>
        <ThemedText>{DeviceInfo.getBatteryLevelSync()}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Power State</ThemedText>
        <ThemedText>
          {JSON.stringify(DeviceInfo.getPowerStateSync(), null, 2)}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Device has low RAM</ThemedText>
        <ThemedText>{DeviceInfo.isLowRamDevice().toString()}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
