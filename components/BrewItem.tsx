import React, { useState, useEffect} from "react";
import { useRecoilState } from "recoil";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Brew, BrewImage } from '../atoms/brewListState'
import brewWithId from "../atoms/brewWithId";

type BrewItemProps = {
  brewId: string;
  name: string;
  brewery: string;
  rating: number;
  style: string;
  brewImage?: BrewImage;
};

// function replaceItemAtIndex(arr, index, newValue) {
//   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
// }

const BrewItem = React.memo(({ brewId, name, brewery, rating, style, brewImage }: BrewItemProps) => {
  const [brew, setBrewItem] = useRecoilState<Brew>(brewWithId(brewId));
  useEffect(() => {
    setBrewItem({
      name,
      brewery,
      rating,
      style,
    });
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Image source={{uri: brewImage?.localURI}} style={styles.image} />
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
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomWidth: 1,
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
