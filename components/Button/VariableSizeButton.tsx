import React from "react";
import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useIsTablet } from "../../utils/hooks/useIsTablet";

const { height } = Dimensions.get("screen");

export const VariableSizeButton = (props) => {
  const isTablet = useIsTablet();

  const { onPress, title = "Save" } = props;

  return (
    <TouchableOpacity
      style={[styles.button, { height: height * 0.15 }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize: isTablet ? 60 : 20 }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#3490dc",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
