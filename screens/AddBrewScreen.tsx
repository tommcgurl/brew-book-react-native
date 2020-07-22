import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";


import { Text, View } from "../components/Themed";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import brewListState from "../atoms/brewListState";
import perisistState from "../utils/persistState";

type AddBrewScreenProps = {
  // TODO: fix this type.
  navigation: any
}

export default function AddBrewScreen({ navigation }: AddBrewScreenProps) {

  const [brewName, setBrewName] = useState("");
  const [brewery, setBrewery] = useState("");
  const [style, setStyle] = useState("");
  const [brews, setBrewList] = useRecoilState(brewListState);
    const handleBrewNameChange = (newText: string) => {
    setBrewName(newText);
  };
  const handleBreweryChange = (newText: string) => {
    setBrewery(newText);
  };
  const handleStyleChange = (newText: string) => {
    setStyle(newText);
  };
  const clearInputs = () => {
    setBrewName("");
    setBrewery("");
    setStyle("");
  };
  const handleAddBrew = () => {
    const newBrew = {
      name: brewName,
      brewery,
      rating: 0,
      style,
    };
    const brewId = `${brewery}-${brewName}`.replace(/\s/g, "-").toLowerCase();
    console.log("New Brew ID to be added:", brewId);
    const newBrews = {
      ...brews,
      [brewId]: newBrew,
    };
    setBrewList(newBrews);
    perisistState('brews', newBrews);
    clearInputs();
    navigation.navigate("AllBrewsScreen");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Brew</Text>
      <View style={styles.formContainer}>
        <TextInput
          value={brewName}
          autoFocus={true}
          placeholderTextColor="#666"
          style={styles.input}
          placeholder="Brew name"
          onChangeText={handleBrewNameChange}
        />
        <TextInput
          value={brewery}
          placeholderTextColor="#666"
          style={styles.input}
          placeholder="Brewery"
          onChangeText={handleBreweryChange}
        />
        <TextInput
          value={style}
          placeholderTextColor="#666"
          style={styles.input}
          placeholder="Style"
          onChangeText={handleStyleChange}
        />
        {/* <TextInput
          placeholderTextColor="#666"
          keyboardType="numeric"
          style={styles.input}
          placeholder="Rating"
        /> */}
      </View>
      <TouchableHighlight style={styles.button} onPress={handleAddBrew}>
        <Text style={styles.buttonText}>Add Brew!</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 0,
    paddingVertical: 12,
    borderBottomColor: "#666",
    borderBottomWidth: 2,
  },
  button: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  buttonText: {
    fontSize: 18,
  },
});
