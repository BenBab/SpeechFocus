import { StyleSheet, Dimensions } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsTablet } from "../../utils/hooks/useIsTablet";
import { useGetDimensions } from "../../utils/hooks/useGetDimensions";

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
  const isTablet = useIsTablet();
  const { height, width } = useGetDimensions();

  const size = isTablet ? height * 0.55 : height * 0.45;
  console.log("🚀 ~ file: IconCaretButton.tsx:7 ~ width", width);
  console.log("🚀 ~ file: IconCaretButton.tsx:22 ~ height", height);

  return (
    <Ionicons.Button
      style={styles.button}
      name={direction}
      backgroundColor="#F7F7F7"
      color={isDisabled ? "#E1EECC" : "#0F9D58"}
      borderRadius={50}
      onPress={handleOnPress}
      size={size}
      disabled={isDisabled}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    padding: -20,
  },
});
