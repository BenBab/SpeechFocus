import { Button, StyleSheet, Text, View } from "react-native";

import { DrawerContentComponentProps } from "@react-navigation/drawer";

type LandingProps = {
  navigation: DrawerContentComponentProps["navigation"];
};

export const Landing = ({ navigation }: LandingProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Speech Focus!</Text>
      <Button
        title="Begin Speech Focus training"
        onPress={() => navigation.toggleDrawer()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 40,
    padding: 30,
  },
});
