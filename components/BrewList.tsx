import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRecoilState } from "recoil";

import BREWS from '../constants/Brews';
import brewListState from '../atoms/brewListState';
import BrewItem from "./BrewItem";
import AverageRating from "./AverageRating";

export type Brew = {
  name: string;
  brewery: string;
  rating: number;
  style: string;
};

const BrewList = () => {
  const [brews, setBrewList] = useRecoilState(brewListState);
  const data = Object.entries(brews).map(
    ([brewId, brewInfo]: [string, Brew]) => {
      return {
        brewId,
        ...brewInfo,
      };
    }
  );
    return (
      <View style={styles.container}>
        <View style={styles.averageRatingContainer}>
          <AverageRating />
        </View>
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
      </View>
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
  }
});

export default BrewList;
