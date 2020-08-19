import * as React from "react";
import { StyleSheet } from "react-native";
import GroupedBrewsList from "../components/GroupedBrewsList";
import { View } from "../components/Themed";
import { AllowedBrewGrouping } from "../atoms/brewListState";

export default function StylesScreen() {
  return (
    <View style={styles.container}>
      <GroupedBrewsList
        groupBy={GroupedBrewsList.AllowedBrewGrouping.Style}
      />
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
