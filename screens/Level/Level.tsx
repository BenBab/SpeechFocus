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
  const exerciseEnd = word === "";

  const speakDescription = async () => {
    const thingToSay = level.description;
    Speech.speak(thingToSay, {
      language: "en-AU",
    });
  };

  useEffect(() => {
    if (isFocused && !isDescriptionMuted) {
      Speech.stop();
      speakDescription();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && !isDescriptionMuted) {
      setTimeout(
        () =>
          Speech.speak(word, {
            language: "en-AU",
          }),
        300
      );
    }
  }, [word, isFocused]);

  useEffect(() => {
    if (isDescriptionMuted) {
      Speech.stop();
    }
  }, [isDescriptionMuted]);

  useEffect(() => {
    if (isFocused && exerciseEnd) {
      const thingToSay = `Well Done! Level ${
        level.id
      } completed. Take a break before moving on to level ${level.id + 1} `;
      Speech.speak(thingToSay, {
        language: "en-AU",
      });
    }
  }, [wordIndex]);

  const onNextPress = () => {
    Speech.stop();
    setWordIndex((prevWord) => prevWord + 1);
  };

  const onBackPress = () => {
    Speech.stop();
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
        <IconCaretButton
          direction="caret-back"
          handleOnPress={onBackPress}
          isDisabled={wordIndex === 0}
        />
        <Text style={styles.hugeText}>{word}</Text>
        {exerciseEnd && (
          <View>
            <Text style={styles.mediumText}>
              Well Done! Level {level.id} complete
            </Text>
            <Button
              title={`Move on to level ${level.id + 1}`}
              onPress={() => {
                Speech.stop();
                setWordIndex(0);
                navigation.jumpTo(`Level ${level.id + 1}`);
              }}
            />
          </View>
        )}
        <IconCaretButton
          direction="caret-forward"
          handleOnPress={onNextPress}
          isDisabled={wordIndex === level.words.length - 1}
        />
      </View>
      {!exerciseEnd && (
        <View style={styles.playSoundBtn}>
          <Button title="Play sound" onPress={onPlaySoundPress} />
        </View>
      )}
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
  mediumText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  playSoundBtn: {
    display: "flex",
    alignItems: "center",
  },
});
