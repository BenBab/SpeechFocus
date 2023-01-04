import { StyleSheet, Text, View } from "react-native";

import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { VariableSizeButton } from "../../components/Button/VariableSizeButton";
import { useIsTablet } from "../../utils/hooks/useIsTablet";
import { useGetDimensions } from "../../utils/hooks/useGetDimensions";

type LandingProps = {
  navigation: DrawerContentComponentProps["navigation"];
};

export const Landing = ({ navigation }: LandingProps) => {
  const isTablet = useIsTablet();
  const { height, width } = useGetDimensions();

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { fontSize: isTablet ? 80 : 45 }]}>
        Welcome to Speech Focus!
      </Text>
      <View style={styles.buttonsContainer}>
        <VariableSizeButton
          title="Mouth exercises"
          onPress={() => navigation.jumpTo("Exercises")}
        />
        <VariableSizeButton
          title="Begin Speech focus training"
          onPress={() => navigation.jumpTo("Level 1")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: 1,
  },
  heading: {
    fontSize: 40,
    padding: 30,
  },
});
