import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { selector, useRecoilValue } from "recoil";
import brewWithId from "../atoms/brewWithId";
import BREWS from "../constants/Brews";

const averageBrewRatingState = selector({
  key: "averageBrewRatingState",
  get: ({ get }) => {
    const brews = Object.keys(BREWS).map((brewId) => get(brewWithId(brewId)));
    const totalRating = brews.reduce((acc, currBrew) => {
      return acc + currBrew.rating;
    }, 0);
    return totalRating / brews.length;
  },
});

const AverageRating = () => {
  const averageRating = useRecoilValue(averageBrewRatingState);

  return (
    <View style={styles.container}>
      <Text style={styles.averageRating}>Average Rating: {averageRating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  averageRating: {
    fontSize: 40,
    color: "tomato",
  },
});

export default AverageRating;
