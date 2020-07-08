import React, { useState } from "react";
import brewItemRatingState from "../atoms/brewItemRatingState";
import { useRecoilState } from "recoil";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import brewListState from "../atoms/brewListState";

type BrewItemProps = {
  name: string;
  brewery: string;
  style: string;
  rating: number;
};

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

const BrewItem = ({ name, brewery, style, rating }: BrewItemProps) => {
  const [brews, setBrewList] = useRecoilState(brewListState);
  const index = brews.findIndex((brew) => brew.name === name);
  const updateRating = (newRating) => {
    const updatedBrew = {
      ...brews[index],
      rating: newRating,
    };
    const newBrewList = replaceItemAtIndex(brews, index, updatedBrew);
    setBrewList(newBrewList);
  };
  const handleIncrease = () => {
    updateRating(rating + 1);
  };
  const handleDecrease = () => {
    updateRating(rating - 1);
  };
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.infoGroup}>
            <Text>{name}</Text>
            <Text>{brewery}</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text>{style}</Text>
            <Text>{rating}/5</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity disabled={rating >= 5} onPress={handleIncrease}>
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={rating <= 0} onPress={handleDecrease}>
          <Text style={styles.buttonText}> - </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBCBCB",
    borderStyle: "solid",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "tomato",
  },
  infoContainer: {
    flex: 1,
  },
  infoGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonText: {
    fontSize: 34,
  },
});

export default BrewItem;
