import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import * as Speech from "expo-speech";
import { LevelType } from "../../App";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

type IconCaretButtonProps = {
  direction: "caret-forward" | "caret-back";
  handleOnPress: () => void;
  isDisabled: boolean;
};

export const IconCaretButton = ({
  direction,
  handleOnPress,
  isDisabled,
}: IconCaretButtonProps) => {
  return (
    <Ionicons.Button
      style={styles.button}
      name={direction}
      backgroundColor="#F7F7F7"
      color={isDisabled ? "#E1EECC" : "#0F9D58"}
      borderRadius={50}
      onPress={handleOnPress}
      size={200}
      disabled={isDisabled}
    />
  );
};

const styles = StyleSheet.create({
  button: {},
});
