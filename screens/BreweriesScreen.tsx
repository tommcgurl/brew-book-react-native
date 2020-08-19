import * as React from "react";
import { StyleSheet } from "react-native";
import GroupedBrewsList from "../components/GroupedBrewsList";
import { View } from "../components/Themed";

export default function BreweriesScreen() {
  return (
    <View style={styles.container}>
      <GroupedBrewsList
        groupBy={GroupedBrewsList.AllowedBrewGrouping.Brewery}
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
