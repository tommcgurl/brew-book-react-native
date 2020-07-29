import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRecoilState } from "recoil";
import { getPersistedState } from "../utils/persistedState";
import brewListState, { Brew, BrewMap } from "../atoms/brewListState";
import BrewItem from "./BrewItem";
import AverageRating from "./AverageRating";

// TODO: See if we can "type" the Brews object.

const BrewList = () => {
  const [brews, setBrewList] = useRecoilState<BrewMap>(brewListState);

  useEffect(() => {
    getPersistedState("brews").then((brews: BrewMap) => {
      brews && setBrewList(brews);
    });
  }, []);

  const data = Object.entries(brews).map(
    ([brewId, brewInfo]: [string, Brew]) => {
      return {
        brewId,
        ...brewInfo,
      };
    }
  );
  return (
    <LinearGradient colors={["#FFE898", "#FF5F04"]} style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <BrewItem
              key={item.brewId}
              brewId={item.brewId}
              name={item.name}
              brewery={item.brewery}
              style={item.style}
              rating={item.rating}
            />
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  averageRatingContainer: {
    flex: 0.1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.64)",
  },
});

export default BrewList;
