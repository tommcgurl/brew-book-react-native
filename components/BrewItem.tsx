import React, { useState, useEffect} from "react";
import { useRecoilState } from "recoil";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Brew } from "./BrewList";
import brewWithId from "../atoms/brewWithId";

type BrewItemProps = {
  brewId: string;
  name: string;
  brewery: string;
  rating: number;
  style: string;
};

// function replaceItemAtIndex(arr, index, newValue) {
//   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
// }

const BrewItem = React.memo(({ brewId, name, brewery, rating, style }: BrewItemProps) => {
  const defaultState: Brew = {
    name,
    brewery,
    rating,
    style,
  };
  const [brew, setBrewItem] = useRecoilState<Brew>(brewWithId(brewId));
  useEffect(() => {
    setBrewItem({
      name,
      brewery,
      rating,
      style,
    });
  }, []);
  const updateRating = (newRating: number) => {
    const updatedBrew = {
      ...brew,
      rating: newRating,
    };
    setBrewItem(updatedBrew);
    // const newBrewList = replaceItemAtIndex(brews, index, updatedBrew);
    // setBrewList(newBrewList);
  };
  const handleIncrease = () => {
    updateRating(brew.rating + 1);
  };
  const handleDecrease = () => {
    updateRating(brew.rating - 1);
  };
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.infoGroup}>
            <Text style={styles.brewName}>{brew.name}</Text>
            <Text>{brew.brewery}</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text>{brew.style}</Text>
            <Text>{brew.rating}/5</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity disabled={brew.rating >= 5} onPress={handleIncrease}>
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={brew.rating <= 0} onPress={handleDecrease}>
          <Text style={styles.buttonText}> - </Text>
        </TouchableOpacity>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#CBCBCB",
    borderStyle: "solid",
    padding: 12,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "#CCC",
  },
  infoContainer: {
    flex: 0.9,
  },
  infoGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonText: {
    fontSize: 34,
  },
  brewName: {
    fontSize: 16,
  }
});

export default BrewItem;
