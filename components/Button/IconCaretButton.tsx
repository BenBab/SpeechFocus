import { StyleSheet } from "react-native";

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
