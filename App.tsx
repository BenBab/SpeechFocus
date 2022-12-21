import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { useEffect, useReducer } from "react";

import * as ScreenOrientation from "expo-screen-orientation";

import Ionicons from "@expo/vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Level } from "./screens/Level/Level";
import { Landing } from "./screens/Landing/LandingScreen";

const Drawer = createDrawerNavigator();

const levels = [
  {
    id: 1,
    words: ["Ah", "ay", "at", "ack", "ba", "be", "cha", "cah", "der", "day"],
    description:
      "Level 1. We are going to start with small similar sounds which will exercise the mouth and tongue. Practice saying this many times in a row before moving to another set. The first sound is .... ",
  },
  {
    id: 2,
    words: [
      "are",
      "air",
      "ate",
      "add",
      "ben",
      "boo",
      "bow",
      "car",
      "can",
      "drew",
    ],
    description:
      "Level 2. In this exercise we wil focus on one syllable words. Again practice each word multiple times before moving on .. The first word is .... ",
  },
  {
    id: 3,
    words: ["ant", "ape", "axe", "able", "bear", "boo", "bow", "car", "can"],
    description:
      "Level 3. In this exercise we will focus on slightly more tricky one syllable words, and a few 2 syllable words. Practice each word multiple times before moving on .. The first word is ....",
  },
];

export type LevelType = typeof levels[number];

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  const [isDescriptionMuted, toggleIsDescriptionMuted] = useReducer(
    (bool) => !bool,
    false
  );

  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        sceneContainerStyle: {
          backgroundColor: "#F7F7F7",
        },
      }}
    >
      <Drawer.Screen name={`Home`}>
        {(props) => <Landing {...props} />}
      </Drawer.Screen>
      {levels.map((level) => (
        <Drawer.Screen
          key={level.id}
          name={`Level ${level.id}`}
          options={{
            headerRight: () => (
              <Ionicons.Button
                name={isDescriptionMuted ? "volume-mute" : "volume-high"}
                backgroundColor="white"
                color="#000"
                borderRadius={50}
                onPress={toggleIsDescriptionMuted}
                iconStyle={{
                  paddingLeft: 10,
                }}
              />
            ),
          }}
        >
          {(props) => (
            <Level
              {...props}
              level={level}
              isDescriptionMuted={isDescriptionMuted}
            />
          )}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default function App() {
  async function changeScreenOrientationToLandscape() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  }

  useEffect(() => {
    changeScreenOrientationToLandscape();
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}
