import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRecoilState } from "recoil";

import brewListState from "../atoms/brewListState";

import BrewItem from "./BrewItem";

const BrewList = () => {
  const [brews, setBrewList] = useRecoilState(brewListState);
  return (
    <View style={styles.container}>
      <FlatList
        data={brews}
        renderItem={({ item }) => (
          <BrewItem
            name={item.name}
            brewery={item.brewery}
            rating={item.rating}
            style={item.style}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default BrewList;
