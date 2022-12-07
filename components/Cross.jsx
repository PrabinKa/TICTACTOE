import react from "react";
import { View, Text, StyleSheet } from "react-native";

const Cross = () => {
  return (
    <View style={styles.cross}>
      <View style={styles.crossline} />
      <View style={[styles.crossline, styles.reverseCrossline]} />
    </View>
  );
};

export default Cross;

const styles = StyleSheet.create({
  cross: {
    height: 75,
    width: 75,
  },
  crossline: {
    position: "absolute",
    left: 30,
    width: 10,
    height: 75,
    backgroundColor: "white",
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },
  reverseCrossline: {
    transform: [
      {
        rotate: "-45deg",
      },
    ],
  },
});
