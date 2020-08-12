import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  ModalProps,
  TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

type ImagePickerModalProps = {
  modalVisible: boolean;
  handleClickUseCameraRoll: () => void;
  handleClickUseCamera: () => void;
  onRequestClose: () => void;
} & ModalProps;

const ImagePickerModal = ({
  modalVisible,
  handleClickUseCamera,
  handleClickUseCameraRoll,
  onRequestClose,
  ...otherModalProps
}: ImagePickerModalProps) => {
  const [hideContent, setContentHidden] = useState(false);
  const onPressUseCamera = () => {
    setContentHidden(true);
    handleClickUseCamera();
  };

  const onPressUseCameraRoll = () => {
    setContentHidden(true);
    handleClickUseCameraRoll();
  };

  useEffect(() => {
    if (modalVisible && hideContent) {
      setContentHidden(false);
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      {...otherModalProps}
    >
      {!hideContent && (
        <View style={styles.contentContainer}>
          <TouchableHighlight onPress={onPressUseCameraRoll}>
            <View style={styles.button}>
              <MaterialCommunityIcons name="image" size={32} color="black" />
              <Text style={styles.buttonText}>Pick from camera</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={onPressUseCamera}>
            <View style={styles.button}>
              <MaterialCommunityIcons
                name="camera-plus"
                size={32}
                color="black"
              />
              <Text style={styles.buttonText}>Take a picture</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.closeButton}
            onPress={onRequestClose}
          >
            <View style={styles.closeButtonIcon}>
              <MaterialCommunityIcons
                name="close-circle"
                size={32}
                color="black"
              />
            </View>
          </TouchableHighlight>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "center",
    backgroundColor: Colors.light.background,
    marginHorizontal: 24,
    marginTop: "60%",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 24,
  },
  buttonText: {
    paddingHorizontal: 8,
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    right: 24,
  },
  closeButtonIcon: {
    height: 32,
    width: 32,
  }
});

export default ImagePickerModal;
