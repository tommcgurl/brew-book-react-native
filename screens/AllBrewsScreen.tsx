import * as React from "react";
import { StyleSheet } from "react-native";
import BrewList from "../components/BrewList";
import { View } from "../components/Themed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <BrewList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
