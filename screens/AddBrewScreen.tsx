import React, { useState } from "react";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import { useRecoilState } from "recoil";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "../components/Themed";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import brewListState, { Brew, BrewImage } from "../atoms/brewListState";
import { persistState } from "../utils/persistedState";

type AddBrewScreenProps = {
  // TODO: fix this type.
  navigation: any;
};



export default function AddBrewScreen({ navigation }: AddBrewScreenProps) {
  const colorScheme = useColorScheme();
  const [brewName, setBrewName] = useState("");
  const [brewery, setBrewery] = useState("");
  const [style, setStyle] = useState("");
  const [brewImage, setBrewImage] = useState<BrewImage>();
  const [brewImageLoading, setBrewImageLoading] = useState(false);
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
    setBrewImage(undefined);
    setBrewImageLoading(false);
  };

  let handleClickAddImage = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    setBrewImageLoading(true);
    let { width, height, uri, cancelled } = await ImagePicker.launchImageLibraryAsync();
    if (!cancelled) {
      setBrewImage({
        width,
        height,
        localURI: uri,
      });
    }
    setBrewImageLoading(false);
  };

  const handleAddBrew = () => {
    const newBrew: Brew = {
      name: brewName,
      brewery,
      rating: 0,
      style,
      brewImage,
    };
    const brewId = `${brewery}-${brewName}`.replace(/\s/g, "-").toLowerCase();
    console.log("New Brew ID to be added:", brewId);
    const newBrews = {
      ...brews,
      [brewId]: newBrew,
    };
    setBrewList(newBrews);
    persistState("brews", newBrews);
    clearInputs();
    navigation.navigate("AllBrewsScreen");
  };
  const buttonEnabled = brewName && brewery && style;
  return (
    <View style={styles.container}>
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
        <View style={styles.imageUploadContainer}>
          {!brewImage && !brewImageLoading && (
            <TouchableHighlight
              style={styles.imageUploadButton}
              onPress={handleClickAddImage}
            >
              <MaterialCommunityIcons
                size={240}
                name="image-plus"
                color={Colors[colorScheme].tabIconDefault}
              />
            </TouchableHighlight>
          )}
          {brewImage && (
            <Image
              style={styles.brewImage}
              source={{ uri: brewImage.localURI }}
            />
          )}
          {brewImageLoading && (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator
                size="large"
                color={Colors[colorScheme].brandOrange}
              />
            </View>
          )}
        </View>
        {/* <TextInput
          placeholderTextColor="#666"
          keyboardType="numeric"
          style={styles.input}
          placeholder="Rating"
        /> */}
      </View>
      <TouchableHighlight
        disabled={!buttonEnabled}
        style={styles.button}
        onPress={handleAddBrew}
      >
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
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  buttonText: {
    fontSize: 18,
    color: "#666",
  },
  imageUploadContainer: {
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageUploadButton: {
    height: 240,
    width: 240,
  },
  brewImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  activityIndicatorContainer: {
    height: 240,
    width: 240,
    justifyContent: "center",
    alignItems: "center",
  },
});
