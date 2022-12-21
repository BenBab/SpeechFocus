import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import * as Speech from "expo-speech";
import { LevelType } from "../../App";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

import { useIsFocused, useNavigation } from "@react-navigation/native";

import { IconCaretButton } from "../../components/Button/IconCaretButton";

type LevelProps = {
  navigation: DrawerContentComponentProps["navigation"];
  level: LevelType;
  isDescriptionMuted: boolean;
};

export const Level = ({
  navigation,
  level,
  isDescriptionMuted,
}: LevelProps) => {
  const [wordIndex, setWordIndex] = useState(0);

  const isFocused = useIsFocused();
  const word = level.words[wordIndex];

  const speakDescription = async () => {
    const thingToSay = level.description;
    Speech.speak(thingToSay, {
      language: "en-AU",
    });
  };

  useEffect(() => {
    if (isFocused && !isDescriptionMuted) {
      console.log("isFocused ", isFocused, level.id);
      speakDescription();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isDescriptionMuted) {
      setTimeout(
        () =>
          Speech.speak(word, {
            language: "en-AU",
          }),
        300
      );
    }
  }, [word]);

  useEffect(() => {
    if (isDescriptionMuted) {
      Speech.stop();
    }
  }, [isDescriptionMuted]);

  const onNextPress = () => {
    setWordIndex((prevWord) => prevWord + 1);
  };

  const onBackPress = () => {
    setWordIndex((prevWord) => prevWord - 1);
  };

  const onPlaySoundPress = () => {
    Speech.speak(word, {
      language: "en-AU",
    });
  };

  return (
    <View>
      <View style={styles.container}>
        {/* <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Press to hear some words" onPress={speak} /> */}
        <IconCaretButton
          direction="caret-back"
          handleOnPress={onBackPress}
          isDisabled={wordIndex === 0}
        />
        <Text style={styles.hugeText}>{word}</Text>
        <IconCaretButton
          direction="caret-forward"
          handleOnPress={onNextPress}
          isDisabled={wordIndex === level.words.length - 1}
        />
      </View>
      <View style={styles.playSoundBtn}>
        <Button title="Play sound" onPress={onPlaySoundPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  hugeText: {
    fontSize: 100,
    fontWeight: "bold",
  },
  playSoundBtn: {
    display: "flex",
    alignItems: "center",
  },
});
